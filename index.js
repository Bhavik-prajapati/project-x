const express = require('express')
const healthRoute = require('./src/routes/health.route')
const userRoute = require('./src/routes/user.route')

const app = express()
app.use(express.json())

const PORT = 3000

app.use('/', healthRoute)
app.use('/',userRoute )
app.get("/hello",(req,res)=>{
  res.send({"msg":"hello world"})
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/health`)
})
