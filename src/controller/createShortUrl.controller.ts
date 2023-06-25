import {Request, Response} from 'express'
import shortUrl from '../model/url.model'
import { validateURL } from '../utils/validateUrl'

export async function shortenUrl(req:Request, res:Response){
  try{
  
  //get original url from request body
  const {originalURL} = req.body
  console.log(originalURL)

  // check if url is valid
  const isValidUrl = validateURL(originalURL)

  if(isValidUrl){
  //shorten url and return to client 
  const shortenedUrl = new shortUrl({originalURL:originalURL})
  await shortenedUrl.save()
  
  return res.send(shortenedUrl)
  }res.send("Invalid URL")
  }catch(e){
    console.log(e)
    res.status(500).json({e: "internal error"})
  }
}