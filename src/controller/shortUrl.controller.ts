import {Request, Response} from 'express'
import shortUrl from '../model/url.model'

export async function shortenUrl(req:Request, res:Response){
  try{
  //get original url from request body
  const originalUrl = req.body
  console.log(originalUrl)

  //shorten url and return to client
  const shortenedUrl = new shortUrl(originalUrl)
  await shortenedUrl.save()
  
  return res.send(shortenedUrl)
  }catch(e){
    console.log(e)
    res.status(500).json({e: "internal error"})
  }
}