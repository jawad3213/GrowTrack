require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const femaleNames = ["Fatima", "Aicha", "Yasmine", "Leila", "Nour", "Sara", "Houda", "Mariam", "Asma", "Rania", "Hafsa", "Nadia", "Salma", "Khadija", "Amina", "Ikram", "Zineb", "Imane", "Wafa", "Ouafa"];
const maleNames = ["Mohamed", "Ahmed", "Youssef", "Ali", "Ibrahim", "Omar", "Hassan", "Yassine", "Adam", "Mehdi", "Khalid", "Rachid", "Soufiane", "Abdelilah", "Redouane", "Tarik", "Mounir", "Fadil", "Jamal", "Badr", "Amine", "Bilal", "Anas", "Ismail", "Moussa", "Issa", "Abdelhakim", "Abdellah", "Mansour", "Riad"];

const firstNames = [
  "Mohamed", "Ahmed", "Youssef", "Ali", "Ibrahim", "Omar", "Hassan", "Yassine", "Adam", "Mehdi",
  "Fatima", "Aicha", "Yasmine", "Leila", "Nour", "Sara", "Houda", "Mariam", "Asma", "Rania",
  "Khalid", "Rachid", "Soufiane", "Abdelilah", "Redouane", "Tarik", "Mounir", "Fadil", "Jamal", "Badr",
  "Hafsa", "Nadia", "Salma", "Khadija", "Amina", "Ikram", "Zineb", "Imane", "Wafa", "Ouafa",
  "Amine", "Bilal", "Anas", "Ismail", "Moussa", "Issa", "Abdelhakim", "Abdellah", "Mansour", "Riad"
];

const lastNames = [
  "Alami", "Bennani", "Chaoui", "Dahmani", "El Amrani", "Fakir", "Ghani", "Haddad", "Idrissi", "Jouhari",
  "Kadiri", "Lazizi", "Mahmoudi", "Nassiri", "Ouadid", "Rifai", "Sabbagh", "Tazi", "Wahbi", "Yahi",
  "Zerrouki", "Alaoui", "Belhaj", "Chtibi", "Drissi", "Errachid", "Fassi", "Guerouabi", "Hassani", "Issaoui"
];

const domains = ["example.com", "student.ac.ma", "gmail.com", "univ.ma"];

let nextStudNum = 300;

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCIN() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function generateCodeApogee() {
  return getRandomInt(100000, 999999).toString();
}

function generateEmail(firstName, lastName) {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomInt(1,999)}@${getRandomElement(domains)}`;
}

function generatePassword() {
  return "password123";
}

function getGender(firstName) {
  return femaleNames.includes(firstName) ? "Mme" : "Mr";
}

async function getNextStudentId() {
  const id = `usr_stud_${nextStudNum}`;
  nextStudNum++;
  return id;
}

async function insertStudent(firstName, lastName, dateAdd) {
  const fullName = `${firstName} ${lastName}`;
  const cin = generateCIN();
  const email = generateEmail(firstName, lastName);
  const password = generatePassword();
  const codeApogee = generateCodeApogee();
  const role = "etudiant";
  const gender = getGender(firstName);
  const userId = await getNextStudentId();
  
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    await client.query(
      `INSERT INTO public.utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'actif')`,
      [userId, lastName, firstName, cin, email, password, role, dateAdd, gender]
    );
    
    await client.query(
      `INSERT INTO public.etudiant (id_utilisateur, code_apogee) VALUES ($1, $2)`,
      [userId, codeApogee]
    );
    
    await client.query("COMMIT");
    return { name: fullName, email, id: userId, date: dateAdd };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function seedStudents() {
  console.log("Starting student seeding...");
  
  const existingCount = await pool.query("SELECT COUNT(*) FROM public.etudiant");
  console.log(`Existing students: ${existingCount.rows[0].count}`);
  
  const maxResult = await pool.query(
    "SELECT id_utilisateur FROM public.utilisateur WHERE id_utilisateur LIKE 'usr_stud_%' ORDER BY id_utilisateur DESC LIMIT 1"
  );
  if (maxResult.rows.length > 0) {
    const maxId = maxResult.rows[0].id_utilisateur;
    const match = maxId.match(/usr_stud_(\d+)/);
    if (match) {
      nextStudNum = parseInt(match[1], 10) + 100; // Start 100 after max to avoid conflicts
    }
  }
  console.log(`Starting from student number: ${nextStudNum}`);
  
  const studentsPerMonth = [5, 8, 12, 15, 10, 7, 4, 6, 9, 11, 8, 3];
  let totalAdded = 0;
  
  const now = new Date();
  
  for (let monthOffset = 11; monthOffset >= 0; monthOffset--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    const monthStudents = studentsPerMonth[11 - monthOffset] || 3;
    
    console.log(`\nAdding ${monthStudents} students for ${targetDate.toLocaleString('default', { month: 'long', year: 'numeric' })}...`);
    
    for (let i = 0; i < monthStudents; i++) {
      const firstName = getRandomElement(firstNames);
      const lastName = getRandomElement(lastNames);
      
      const day = getRandomInt(1, 28);
      const dateAdd = new Date(targetDate.getFullYear(), targetDate.getMonth(), day);
      
      try {
        await insertStudent(firstName, lastName, dateAdd);
        totalAdded++;
        process.stdout.write(".");
      } catch (error) {
        console.error(`\nError inserting ${firstName} ${lastName}:`, error.message);
        process.stdout.write("e");
      }
    }
  }
  
  console.log(`\n\nTotal students added: ${totalAdded}`);
  
  const finalCount = await pool.query("SELECT COUNT(*) FROM public.etudiant");
  console.log(`Total students in database: ${finalCount.rows[0].count}`);
  
  console.log("\nStudent distribution by month:");
  for (let i = 0; i < 12; i++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = targetDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM public.utilisateur 
       WHERE my_role = 'etudiant' 
       AND EXTRACT(MONTH FROM date_creation) = $1 
       AND EXTRACT(YEAR FROM date_creation) = $2`,
      [targetDate.getMonth() + 1, targetDate.getFullYear()]
    );
    console.log(`  ${monthName}: ${countResult.rows[0].count}`);
  }
  
  await pool.end();
  console.log("\nSeeding complete!");
}

seedStudents().catch(console.error);
