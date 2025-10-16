require("dotenv").config();
const express=require("express");
const MongoClient=require("mongodb").MongoClient;
var cors=require("cors");
const bodyParser=require("body-parser");
const argon2=require("argon2")
const jwt=require("jsonwebtoken")

const app=express();
app.use(cors());
const PORT=process.env.PORT || 3000;
const JWT_SECRET=process.env.JWT_SECRET || "secretKey";
let db;
app.use(bodyParser.json());


async function log(sujeto, objeto, accion){
	toLog={};
	toLog["timestamp"]=new Date();
	toLog["sujeto"]=sujeto;
	toLog["objeto"]=objeto;
	toLog["accion"]=accion;
	await db.collection("log402").insertOne(toLog);
}

app.get("/reportes", async (req,res)=>{
	try{
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, JWT_SECRET);
	let user=verifiedToken.usuario;	
	if("_sort" in req.query){//getList
		let sortBy=req.query._sort;
		let sortOrder=req.query._order=="ASC"?1:-1;
		let inicio=Number(req.query._start);
		let fin=Number(req.query._end);
		let sorter={}
		sorter[sortBy]=sortOrder;
		let data= await db.collection("ejemplo402").find({}).sort(sorter).project({_id:0}).toArray();
		res.set("Access-Control-Expose-Headers", "X-Total-Count");
		res.set("X-Total-Count", data.length);
		data=data.slice(inicio,fin)
		log(user, "reportes", "leer");
		res.json(data)
	}else if("id" in req.query){
		let data=[];
		for(let index=0; index<req.query.id.length; index++){
			let dataParcial=await db.collection("ejemplo402").find({id: Number(req.query.id[index])}.project({_id:0}).toArray())
			data= await data.concat(dataParcial);
		}
		res.json(data);
	}else{
		let data=await db.collection("ejemplo402").find(req.query).project({_id:0}).toArray();
		res.set("Access-Control-Expose-Headers", "X-Total-Count");
		res.set("X-Total-Count", data.length);
		res.json(data);
	}
	}catch{
		res.sendStatus(401);
	}
});

//getOne

app.get("/reportes/:id", async (req,res)=>{
	let data=await db.collection("ejemplo402").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/reportes", async (req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data=await db.collection("ejemplo402").insertOne(valores);
	res.json(data)
});

//deleteOne
app.delete("/reportes/:id", async(req,res)=>{
	let data=await db.collection("ejemplo402").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/reportes/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("ejemplo402").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("ejemplo402").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

// ============================================
// ENDPOINTS PARA FOLIOS
// ============================================

// GET /folios - getList con paginación, ordenamiento y filtros
app.get("/folios", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		if ("_sort" in req.query) { // getList con paginación
			let sortBy = req.query._sort;
			let sortOrder = req.query._order == "ASC" ? 1 : -1;
			let inicio = Number(req.query._start);
			let fin = Number(req.query._end);
			let sorter = {};
			sorter[sortBy] = sortOrder;

			let data = await db.collection("folios").find({}).sort(sorter).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data = data.slice(inicio, fin);
			log(user, "folios", "leer");
			res.json(data);
		} else if ("id" in req.query) { // getMany
			let data = [];
			for (let index = 0; index < req.query.id.length; index++) {
				let dataParcial = await db.collection("folios").find({ id: Number(req.query.id[index]) }).project({ _id: 0 }).toArray();
				data = await data.concat(dataParcial);
			}
			res.json(data);
		} else { // filtros personalizados
			let data = await db.collection("folios").find(req.query).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

// GET /folios/:id - getOne
app.get("/folios/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		await jwt.verify(token, JWT_SECRET);
		let data = await db.collection("folios").find({ "id": Number(req.params.id) }).project({ _id: 0 }).toArray();
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

// POST /folios - create
app.post("/folios", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		// Obtener el último ID y sumar 1
		let lastDoc = await db.collection("folios").find({}).sort({ id: -1 }).limit(1).toArray();
		valores["id"] = lastDoc.length > 0 ? lastDoc[0].id + 1 : 1;

		let data = await db.collection("folios").insertOne(valores);
		log(user, "folios", "crear");
		res.json(valores);
	} catch {
		res.sendStatus(401);
	}
});

// PUT /folios/:id - update
app.put("/folios/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		valores["id"] = Number(valores["id"]);
		await db.collection("folios").updateOne({ "id": valores["id"] }, { "$set": valores });
		let data = await db.collection("folios").find({ "id": valores["id"] }).project({ _id: 0 }).toArray();
		log(user, "folios", "actualizar");
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

// DELETE /folios/:id - delete
app.delete("/folios/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let data = await db.collection("folios").deleteOne({ "id": Number(req.params.id) });
		log(user, "folios", "eliminar");
		res.json({ id: Number(req.params.id) });
	} catch {
		res.sendStatus(401);
	}
});

// ============================================
// ENDPOINTS PARA FOLIOS CREADOS
// ============================================

app.get("/foliosCreados", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		if ("_sort" in req.query) {
			let sortBy = req.query._sort;
			let sortOrder = req.query._order == "ASC" ? 1 : -1;
			let inicio = Number(req.query._start);
			let fin = Number(req.query._end);
			let sorter = {};
			sorter[sortBy] = sortOrder;

			let data = await db.collection("foliosCreados").find({}).sort(sorter).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data = data.slice(inicio, fin);
			log(user, "foliosCreados", "leer");
			res.json(data);
		} else if ("id" in req.query) {
			let data = [];
			for (let index = 0; index < req.query.id.length; index++) {
				let dataParcial = await db.collection("foliosCreados").find({ id: Number(req.query.id[index]) }).project({ _id: 0 }).toArray();
				data = await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data = await db.collection("foliosCreados").find(req.query).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

app.get("/foliosCreados/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		await jwt.verify(token, JWT_SECRET);
		let data = await db.collection("foliosCreados").find({ "id": Number(req.params.id) }).project({ _id: 0 }).toArray();
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.post("/foliosCreados", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		let lastDoc = await db.collection("foliosCreados").find({}).sort({ id: -1 }).limit(1).toArray();
		valores["id"] = lastDoc.length > 0 ? lastDoc[0].id + 1 : 1;

		await db.collection("foliosCreados").insertOne(valores);
		log(user, "foliosCreados", "crear");
		res.json(valores);
	} catch {
		res.sendStatus(401);
	}
});

app.put("/foliosCreados/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		valores["id"] = Number(valores["id"]);
		await db.collection("foliosCreados").updateOne({ "id": valores["id"] }, { "$set": valores });
		let data = await db.collection("foliosCreados").find({ "id": valores["id"] }).project({ _id: 0 }).toArray();
		log(user, "foliosCreados", "actualizar");
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.delete("/foliosCreados/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		await db.collection("foliosCreados").deleteOne({ "id": Number(req.params.id) });
		log(user, "foliosCreados", "eliminar");
		res.json({ id: Number(req.params.id) });
	} catch {
		res.sendStatus(401);
	}
});

// ============================================
// ENDPOINTS PARA PERFILES
// ============================================

app.get("/perfiles", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		if ("_sort" in req.query) {
			let sortBy = req.query._sort;
			let sortOrder = req.query._order == "ASC" ? 1 : -1;
			let inicio = Number(req.query._start);
			let fin = Number(req.query._end);
			let sorter = {};
			sorter[sortBy] = sortOrder;

			let data = await db.collection("perfiles").find({}).sort(sorter).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data = data.slice(inicio, fin);
			log(user, "perfiles", "leer");
			res.json(data);
		} else if ("id" in req.query) {
			let data = [];
			for (let index = 0; index < req.query.id.length; index++) {
				let dataParcial = await db.collection("perfiles").find({ id: Number(req.query.id[index]) }).project({ _id: 0 }).toArray();
				data = await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data = await db.collection("perfiles").find(req.query).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

app.get("/perfiles/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		await jwt.verify(token, JWT_SECRET);
		let data = await db.collection("perfiles").find({ "id": Number(req.params.id) }).project({ _id: 0 }).toArray();
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.post("/perfiles", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		let lastDoc = await db.collection("perfiles").find({}).sort({ id: -1 }).limit(1).toArray();
		valores["id"] = lastDoc.length > 0 ? lastDoc[0].id + 1 : 1;

		await db.collection("perfiles").insertOne(valores);
		log(user, "perfiles", "crear");
		res.json(valores);
	} catch {
		res.sendStatus(401);
	}
});

app.put("/perfiles/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		valores["id"] = Number(valores["id"]);
		await db.collection("perfiles").updateOne({ "id": valores["id"] }, { "$set": valores });
		let data = await db.collection("perfiles").find({ "id": valores["id"] }).project({ _id: 0 }).toArray();
		log(user, "perfiles", "actualizar");
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.delete("/perfiles/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		await db.collection("perfiles").deleteOne({ "id": Number(req.params.id) });
		log(user, "perfiles", "eliminar");
		res.json({ id: Number(req.params.id) });
	} catch {
		res.sendStatus(401);
	}
});

// ============================================
// ENDPOINTS PARA EQUIPO MIEMBROS
// ============================================

app.get("/equipoMiembros", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		if ("_sort" in req.query) {
			let sortBy = req.query._sort;
			let sortOrder = req.query._order == "ASC" ? 1 : -1;
			let inicio = Number(req.query._start);
			let fin = Number(req.query._end);
			let sorter = {};
			sorter[sortBy] = sortOrder;

			let data = await db.collection("equipoMiembros").find({}).sort(sorter).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data = data.slice(inicio, fin);
			log(user, "equipoMiembros", "leer");
			res.json(data);
		} else if ("id" in req.query) {
			let data = [];
			for (let index = 0; index < req.query.id.length; index++) {
				let dataParcial = await db.collection("equipoMiembros").find({ id: Number(req.query.id[index]) }).project({ _id: 0 }).toArray();
				data = await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data = await db.collection("equipoMiembros").find(req.query).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

app.get("/equipoMiembros/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		await jwt.verify(token, JWT_SECRET);
		let data = await db.collection("equipoMiembros").find({ "id": Number(req.params.id) }).project({ _id: 0 }).toArray();
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.post("/equipoMiembros", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		let lastDoc = await db.collection("equipoMiembros").find({}).sort({ id: -1 }).limit(1).toArray();
		valores["id"] = lastDoc.length > 0 ? lastDoc[0].id + 1 : 1;

		await db.collection("equipoMiembros").insertOne(valores);
		log(user, "equipoMiembros", "crear");
		res.json(valores);
	} catch {
		res.sendStatus(401);
	}
});

app.put("/equipoMiembros/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		valores["id"] = Number(valores["id"]);
		await db.collection("equipoMiembros").updateOne({ "id": valores["id"] }, { "$set": valores });
		let data = await db.collection("equipoMiembros").find({ "id": valores["id"] }).project({ _id: 0 }).toArray();
		log(user, "equipoMiembros", "actualizar");
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.delete("/equipoMiembros/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		await db.collection("equipoMiembros").deleteOne({ "id": Number(req.params.id) });
		log(user, "equipoMiembros", "eliminar");
		res.json({ id: Number(req.params.id) });
	} catch {
		res.sendStatus(401);
	}
});

// ============================================
// ENDPOINTS PARA SOLICITUDES DE MODIFICACIÓN
// ============================================

app.get("/solicitudesModificacion", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		if ("_sort" in req.query) {
			let sortBy = req.query._sort;
			let sortOrder = req.query._order == "ASC" ? 1 : -1;
			let inicio = Number(req.query._start);
			let fin = Number(req.query._end);
			let sorter = {};
			sorter[sortBy] = sortOrder;

			let data = await db.collection("solicitudesModificacion").find({}).sort(sorter).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data = data.slice(inicio, fin);
			log(user, "solicitudesModificacion", "leer");
			res.json(data);
		} else if ("id" in req.query) {
			let data = [];
			for (let index = 0; index < req.query.id.length; index++) {
				let dataParcial = await db.collection("solicitudesModificacion").find({ id: Number(req.query.id[index]) }).project({ _id: 0 }).toArray();
				data = await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data = await db.collection("solicitudesModificacion").find(req.query).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

app.get("/solicitudesModificacion/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		await jwt.verify(token, JWT_SECRET);
		let data = await db.collection("solicitudesModificacion").find({ "id": Number(req.params.id) }).project({ _id: 0 }).toArray();
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.post("/solicitudesModificacion", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		let lastDoc = await db.collection("solicitudesModificacion").find({}).sort({ id: -1 }).limit(1).toArray();
		valores["id"] = lastDoc.length > 0 ? lastDoc[0].id + 1 : 1;

		await db.collection("solicitudesModificacion").insertOne(valores);
		log(user, "solicitudesModificacion", "crear");
		res.json(valores);
	} catch {
		res.sendStatus(401);
	}
});

app.put("/solicitudesModificacion/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		valores["id"] = Number(valores["id"]);
		await db.collection("solicitudesModificacion").updateOne({ "id": valores["id"] }, { "$set": valores });
		let data = await db.collection("solicitudesModificacion").find({ "id": valores["id"] }).project({ _id: 0 }).toArray();
		log(user, "solicitudesModificacion", "actualizar");
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.delete("/solicitudesModificacion/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		await db.collection("solicitudesModificacion").deleteOne({ "id": Number(req.params.id) });
		log(user, "solicitudesModificacion", "eliminar");
		res.json({ id: Number(req.params.id) });
	} catch {
		res.sendStatus(401);
	}
});

// ============================================
// ENDPOINTS PARA USUARIOS
// ============================================

app.get("/usuarios", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		if ("_sort" in req.query) {
			let sortBy = req.query._sort;
			let sortOrder = req.query._order == "ASC" ? 1 : -1;
			let inicio = Number(req.query._start);
			let fin = Number(req.query._end);
			let sorter = {};
			sorter[sortBy] = sortOrder;

			let data = await db.collection("usuarios").find({}).sort(sorter).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data = data.slice(inicio, fin);
			log(user, "usuarios", "leer");
			res.json(data);
		} else if ("id" in req.query) {
			let data = [];
			for (let index = 0; index < req.query.id.length; index++) {
				let dataParcial = await db.collection("usuarios").find({ id: Number(req.query.id[index]) }).project({ _id: 0 }).toArray();
				data = await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data = await db.collection("usuarios").find(req.query).project({ _id: 0 }).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

app.get("/usuarios/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		await jwt.verify(token, JWT_SECRET);
		let data = await db.collection("usuarios").find({ "id": Number(req.params.id) }).project({ _id: 0 }).toArray();
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.post("/usuarios", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		let lastDoc = await db.collection("usuarios").find({}).sort({ id: -1 }).limit(1).toArray();
		valores["id"] = lastDoc.length > 0 ? lastDoc[0].id + 1 : 1;

		// Hashear la contraseña antes de guardar
		if (valores.password) {
			valores.password = await argon2.hash(valores.password, { type: argon2.argon2id, memoryCost: 19 * 1024, timeCost: 2, parallelism: 1, saltLength: 16 });
		}

		await db.collection("usuarios").insertOne(valores);
		log(user, "usuarios", "crear");

		// Crear perfil automáticamente para el nuevo usuario
		let lastPerfilDoc = await db.collection("perfiles").find({}).sort({ id: -1 }).limit(1).toArray();
		let perfilId = lastPerfilDoc.length > 0 ? lastPerfilDoc[0].id + 1 : 1;

		let nuevoPerfil = {
			id: perfilId,
			userId: valores.username,
			username: valores.username,
			nombre: valores.fullName || "",
			email: valores.email || "",
			turno: valores.turno || "",
			telefono: valores.telefono || "",
			rol: valores.role || "usuario",
			// Estadísticas iniciales
			estadisticas: {
				foliosCreados: 0,
				foliosCompletados: 0,
				ultimaActividad: new Date().toISOString()
			}
		};

		// Agregar campos según el rol
		if (valores.role === "admin") {
			nuevoPerfil.departamento = "";
			nuevoPerfil.nivelAcceso = "";
		} else if (valores.role === "jefe_turno") {
			nuevoPerfil.turno = valores.turno || "";
			nuevoPerfil.especialidad = "";
			nuevoPerfil.numeroEmpleado = "";
			nuevoPerfil.fechaIngreso = "";
			nuevoPerfil.horario = {
				horaInicio: "",
				horaFin: "",
				diasTrabajo: ""
			};
			nuevoPerfil.equipoACargo = "";
			nuevoPerfil.zona = "";
		} else {
			nuevoPerfil.turno = valores.turno || "";
			nuevoPerfil.especialidad = "";
			nuevoPerfil.numeroEmpleado = "";
			nuevoPerfil.fechaIngreso = "";
			nuevoPerfil.horario = {
				horaInicio: "",
				horaFin: "",
				diasTrabajo: ""
			};
		}

		await db.collection("perfiles").insertOne(nuevoPerfil);
		log(user, "perfiles", "crear automático");

		res.json(valores);
	} catch (error) {
		console.error("Error al crear usuario:", error);
		res.sendStatus(401);
	}
});

app.put("/usuarios/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		let valores = req.body;
		valores["id"] = Number(valores["id"]);

		// Si se está actualizando la contraseña, hashearla
		if (valores.password) {
			valores.password = await argon2.hash(valores.password, { type: argon2.argon2id, memoryCost: 19 * 1024, timeCost: 2, parallelism: 1, saltLength: 16 });
		}

		await db.collection("usuarios").updateOne({ "id": valores["id"] }, { "$set": valores });
		let data = await db.collection("usuarios").find({ "id": valores["id"] }).project({ _id: 0 }).toArray();
		log(user, "usuarios", "actualizar");
		res.json(data[0]);
	} catch {
		res.sendStatus(401);
	}
});

app.delete("/usuarios/:id", async (req, res) => {
	try {
		let token = req.get("Authentication");
		let verifiedToken = await jwt.verify(token, JWT_SECRET);
		let user = verifiedToken.usuario;

		await db.collection("usuarios").deleteOne({ "id": Number(req.params.id) });
		log(user, "usuarios", "eliminar");
		res.json({ id: Number(req.params.id) });
	} catch {
		res.sendStatus(401);
	}
});

async function connectToDB(){
	const MONGO_HOST=process.env.MONGO_HOST || "127.0.0.1";
	const MONGO_PORT=process.env.MONGO_PORT || "27017";
	const MONGO_DB=process.env.MONGO_DB || "tc2007b";
	const MONGO_USER=process.env.MONGO_USER;
	const MONGO_PASS=process.env.MONGO_PASS;
	
	let mongoURL;
	if(MONGO_USER && MONGO_PASS){
		mongoURL=`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
	}else{
		mongoURL=`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
	}
	
	console.log(`Conectando a MongoDB en ${MONGO_HOST}:${MONGO_PORT}...`);
	let client=new MongoClient(mongoURL);
	await client.connect();
	db=client.db();
	console.log("✓ Conectado a la base de datos");
}


app.post("/registrarse", async(req, res)=>{
	let user=req.body.username;
	let pass=req.body.password;
	let nombre=req.body.nombre;
	let tipo=req.body.tipo;
	let data=await db.collection("usuarios402").findOne({"usuario":user})
	if(data==null){
		const hash=await argon2.hash(pass, {type: argon2.argon2id, memoryCost: 19*1024, timeCost:2, parallelism:1, saltLength:16})
		let usuarioAgregar={"usuario":user, "password":hash, "nombre":nombre, "tipo":tipo}
		data=await db.collection("usuarios402").insertOne(usuarioAgregar);
		res.sendStatus(201);
	}else{
		res.sendStatus(403)
	}
})

app.post("/login", async (req, res)=>{
	let user=req.body.username;
	let pass=req.body.password;
	let data=await db.collection("usuarios").findOne({"username":user});
	if(data==null){
		res.sendStatus(401);
	}else if(await argon2.verify(data.password, pass)){
		let token=jwt.sign({"usuario":data.username}, JWT_SECRET, {expiresIn: 900})
		res.json({"token":token, "id":data.username, "nombre":data.fullName})
	}else{
		res.sendStatus(401);
	}
})

app.listen(PORT, ()=>{
	connectToDB();
	console.log("aplicacion corriendo en puerto 3000");
});
