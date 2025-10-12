// Script para probar la conexión a MongoDB
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

async function testConnection() {
    const MONGO_HOST = process.env.MONGO_HOST || "127.0.0.1";
    const MONGO_PORT = process.env.MONGO_PORT || "27017";
    const MONGO_DB = process.env.MONGO_DB || "tc2007b";
    const MONGO_USER = process.env.MONGO_USER;
    const MONGO_PASS = process.env.MONGO_PASS;

    let mongoURL;
    if (MONGO_USER && MONGO_PASS) {
        mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
        console.log(`🔐 Intentando conectar con autenticación...`);
    } else {
        mongoURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
        console.log(`🔓 Intentando conectar sin autenticación...`);
    }

    console.log(`📍 Host: ${MONGO_HOST}:${MONGO_PORT}`);
    console.log(`📦 Base de datos: ${MONGO_DB}`);
    console.log("");

    try {
        console.log("⏳ Conectando a MongoDB...");
        const client = new MongoClient(mongoURL, {
            serverSelectionTimeoutMS: 5000 // Timeout de 5 segundos
        });
        
        await client.connect();
        console.log("✅ ¡Conexión exitosa!");
        
        const db = client.db();
        
        // Listar colecciones
        console.log("\n📚 Colecciones disponibles:");
        const collections = await db.listCollections().toArray();
        if (collections.length === 0) {
            console.log("   (No hay colecciones todavía)");
        } else {
            collections.forEach(col => {
                console.log(`   - ${col.name}`);
            });
        }
        
        // Probar una consulta simple
        console.log("\n🔍 Probando consulta...");
        const usuarios = await db.collection("usuarios402").countDocuments();
        console.log(`   Usuarios registrados: ${usuarios}`);
        
        const reportes = await db.collection("ejemplo402").countDocuments();
        console.log(`   Reportes: ${reportes}`);
        
        await client.close();
        console.log("\n✨ Todo funcionó correctamente!");
        
    } catch (error) {
        console.log("\n❌ Error al conectar:");
        console.error(error.message);
        console.log("\n💡 Posibles soluciones:");
        console.log("   1. Verifica que el túnel SSH esté activo");
        console.log("   2. Verifica que MongoDB esté corriendo en el servidor");
        console.log("   3. Revisa los valores en el archivo .env");
        console.log("   4. Verifica las credenciales de MongoDB");
        process.exit(1);
    }
}

testConnection();


