import { env } from "$env/dynamic/private";
import { json as retjson } from "@sveltejs/kit";
export async function POST({request}: {request: Request}){
    const json = await request.json()
    if(!json){
        return retjson("No code given.")
    }
    if(json.code==env.CODE){
        return retjson(true)
    }
    return retjson(false)
}

