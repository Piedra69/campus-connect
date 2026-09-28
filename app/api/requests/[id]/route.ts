import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { requests, statusHistory } from "../../../../db/schema";

export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){
  try {
    const {id}=await params; const numericId=Number(id); const body=await request.json() as Record<string,unknown>; const db=getDb();
    const [old]=await db.select().from(requests).where(eq(requests.id,numericId));
    if(!old) return Response.json({error:"Solicitud no encontrada."},{status:404});
    const values={title:String(body.title||old.title).trim(),category:String(body.category||old.category),priority:String(body.priority||old.priority),status:String(body.status||old.status),assignee:String(body.assignee||old.assignee),location:String(body.location||old.location).trim(),description:String(body.description||old.description).trim(),updatedAt:new Date().toISOString()};
    const statements=[db.update(requests).set(values).where(eq(requests.id,numericId)).returning()];
    const [updated]=await statements[0];
    if(values.status!==old.status) await db.insert(statusHistory).values({requestId:numericId,previousStatus:old.status,newStatus:values.status});
    return Response.json({request:updated});
  } catch { return Response.json({error:"No se pudo actualizar la solicitud."},{status:500}); }
}
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){
  try { const {id}=await params; await getDb().delete(requests).where(eq(requests.id,Number(id))); return new Response(null,{status:204}); }
  catch { return Response.json({error:"No se pudo eliminar la solicitud."},{status:500}); }
}
