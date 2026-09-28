import { asc } from "drizzle-orm";
import { getDb } from "../../../db";
import { resources } from "../../../db/schema";
export async function GET(){try{return Response.json({resources:await getDb().select().from(resources).orderBy(asc(resources.name))});}catch{return Response.json({error:"No se pudieron cargar los recursos."},{status:500});}}
