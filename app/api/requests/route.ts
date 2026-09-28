import { desc, sql } from "drizzle-orm";
import { getDb } from "../../../db";
import { requests, resources } from "../../../db/schema";

const requestSeeds = [
  { code:"SOL-0027", title:"Fuga de agua en laboratorio", category:"Mantenimiento", priority:"Urgente", status:"En progreso", assignee:"Mario Céspedes", location:"Laboratorio de Química", description:"Se observa una fuga continua debajo del lavamanos principal.", hours:3 },
  { code:"SOL-0026", title:"Proyector sin señal", category:"Equipamiento", priority:"Alta", status:"Pendiente", assignee:"Sin asignar", location:"Edificio B · Aula 12", description:"El proyector enciende pero no reconoce ninguna entrada HDMI.", hours:1 },
  { code:"SOL-0025", title:"Acceso a plataforma académica", category:"Soporte tecnológico", priority:"Media", status:"Resuelta", assignee:"Diego Flores", location:"Facultad de Ingeniería", description:"La cuenta del estudiante mostraba un error al iniciar sesión.", hours:4 },
];
const resourceSeeds = [
  {name:"Proyectores multimedia",location:"Aulas y auditorios",available:18,total:24,status:"Operativo"},
  {name:"Equipos de cómputo",location:"Laboratorios",available:46,total:52,status:"Operativo"},
  {name:"Aires acondicionados",location:"Bloques A-C",available:29,total:34,status:"En revisión"},
];

async function seedIfEmpty() {
  const db=getDb();
  const [{ count }]=await db.select({count:sql<number>`count(*)`}).from(requests);
  if(Number(count)===0) await db.insert(requests).values(requestSeeds);
  const [{ resourceCount }]=await db.select({resourceCount:sql<number>`count(*)`}).from(resources);
  if(Number(resourceCount)===0) await db.insert(resources).values(resourceSeeds);
}

export async function GET(){
  try { await seedIfEmpty(); return Response.json({requests:await getDb().select().from(requests).orderBy(desc(requests.id))}); }
  catch { return Response.json({error:"La base de datos no está disponible."},{status:500}); }
}

export async function POST(request:Request){
  try {
    const body=await request.json() as Record<string,unknown>;
    const title=String(body.title||"").trim(), category=String(body.category||"").trim(), location=String(body.location||"").trim(), description=String(body.description||"").trim();
    if(!title||!category||!location||description.length<12) return Response.json({error:"Completa los campos obligatorios."},{status:400});
    const db=getDb(); const [{max}]=await db.select({max:sql<number>`coalesce(max(id),0)`}).from(requests);
    const code=`SOL-${String(Number(max)+28).padStart(4,"0")}`;
    const [created]=await db.insert(requests).values({code,title,category,location,description,priority:String(body.priority||"Media"),status:String(body.status||"Pendiente"),assignee:String(body.assignee||"Sin asignar")}).returning();
    return Response.json({request:created},{status:201});
  } catch { return Response.json({error:"No se pudo guardar la solicitud."},{status:500}); }
}
