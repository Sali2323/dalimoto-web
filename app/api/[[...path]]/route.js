import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'dalimoto'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }
  return cachedClient.db(dbName)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

function joinPath(params) {
  const segs = params?.path || []
  return '/' + segs.join('/')
}

export async function GET(request, { params }) {
  const path = joinPath(await params)
  try {
    if (path === '/' || path === '/health') {
      return NextResponse.json({ ok: true, service: 'DaliMoto API', time: new Date().toISOString() }, { headers: corsHeaders })
    }
    if (path === '/contacts') {
      const db = await getDb()
      const list = await db.collection('contacts').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(100).toArray()
      return NextResponse.json({ contacts: list }, { headers: corsHeaders })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: corsHeaders })
  }
}

export async function POST(request, { params }) {
  const path = joinPath(await params)
  try {
    const body = await request.json().catch(() => ({}))
    if (path === '/contact') {
      const { name, phone, email, service, message } = body || {}
      if (!name || !phone) {
        return NextResponse.json({ error: 'Jméno a telefon jsou povinné' }, { status: 400, headers: corsHeaders })
      }
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : '',
        service: service ? String(service).trim() : '',
        message: message ? String(message).trim() : '',
        createdAt: new Date().toISOString(),
        status: 'new',
      }
      await db.collection('contacts').insertOne(doc)
      return NextResponse.json({ ok: true, id: doc.id }, { headers: corsHeaders })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: corsHeaders })
  }
}
