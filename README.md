<!-- copyright 2023 © Xron Trix | https://github.com/Xrontrix10 -->

<h1 align='center'>Serverless RESTful API</h1>

<p align='center'>Built for <i>Cloudflare Workers</i>. uses <i>Cloudflare D1 Sqlite</i> as Database</p>
<p align='center'><strong>Blazing Fast Serverless 🔥</strong></p>

---

<h2> Features 🚀</h2>

<ul>
   <li>TOKEN based Authentication System</li>
   <li>Every type Error Handling</li>
   <li>Real time http response code</li>
</ul>

<details>

   <summary>
      <h3>Authentication</h3>
   </summary>

   Need to pass `Authorization` header along with AUTH_TOKEN. Otherwise it will return `Unauthorized (http - 401)`


   <h4>Example</h4>

   <pre>
      curl -x POST https://backend.workers.dev/faculty \
         -H 'Authorization: AUTH_TOKEN' \    # required for authentication
         -d '{name: "Xron Trix"}'</pre>

</details>

<details>
   <summary>
      <h3>Available HTTP Responses</h3>
   </summary>

   <ul>
      <li><code>200</code> - OK</li>
      <li><code>204</code> - No Content</li>
      <li><code>400</code> - Bad Request</li>
      <li><code>401</code> - Unauthorized</li>
      <li><code>404</code> - Not Found</li>
      <li><code>405</code> - Method not Allowed</li>
      <li><code>409</code> - Data conflicts</li>
      <li><code>422</code> - Unprocessable Entity</li>
      <li><code>500</code> - Server error</li>
   </ul>
</details>


<details>

   <summary>
      <h3>Allowed HTTP Methods</h3>
   </summary>

   - `GET`
   - `POST`
   - `PUT`
   - `DELETE`

</details>


<details>

   <summary>
      <h3>Api Routes</h3>
   </summary>

   - `/` - Check if Server is Online
   - `/faculty` - Access Faculty Members Data
   - `/member` - Access Regular Members Data
   - `/event` - Access Event Data

</details>


<details>

   <summary>
      <h3>JSON Data Formats</h3>
   </summary>

   <h4>Unique ID Will be Auto Added on Creation on Each Data</h4>
   <h4>Each Field is Required on POST request</h4>

   - Faculty

      <pre>
      {
         name: "String",
         role: "String",
         image: "String",
         mobile: "String"
      }</pre>

   - Member

      <pre>
      {
         name: "String",
         role: "String",
         image: "String",
         mobile: "String",
         roll: "String"
      }</pre>

   - Event

      <pre>
      {
         title: "String",
         page: "String",
         image: "String"
      }</pre>

</details>


<details>

   <summary>
      <h3>CRUD Operation</h3>
   </summary>

   <h4><strong>Accepts</strong></h4>

   - `POST /<API_ROUTE> {json in body}` - Create Single Data
   - `GET /<API_ROUTE>` - Read All Data
   - `GET /<API_ROUTE>/<ID>` - Read Single Data
   - `PUT /<API_ROUTE>/<ID>` - Update Single Data
   - `DELETE /<API_ROUTE>` - Delete All Data
   - `DELETE /<API_ROUTE>/<ID>` - Delete Single Data

   <br>

   <h4><strong>Returns</strong></h4>

   <h4>Returns an Object of Following Properties on Success</h4>

   <pre>
   {
     "id": # ID of the object (if any or null),
     "collection": # Table Name of the Data,
     "results": [
       {
         # Query results object array (if any or null)
       }
     ],
     "time": # Time taken on Operation in Seconds,
     "success": # Boolean value
   }</pre>

   <h4>Also Returns HTTP status</h4>

   - Create

      - Returns `http - 200` on Success  
      - Returns `http - 409` on Data Conflict
      - Returns `http - 422` on Unprocessable Entity
      - Returns `http - 500` on Creation error

   - Read

      - Returns `http - 200` on Success 
      - Returns `http - 404` on Not Found

   - Update

      - Returns `http - 200` on Success 
      - Returns `http - 404` on Not Found
      - Returns `http - 422` on Unprocessable Entity
      - Returns `http - 500` on Update error

   - Delete

      - Returns `http - 200` on Success 
      - Returns `http - 404` on Not Found
      - Returns `http - 500` on Update error

</details>

---

<h2> Deploy Step by Step 🦀 </h2>

<details>

   <summary>
      <h3>1. Set up Cloudflare</h3>
   </summary>

   - Create a Cloudflare Account if haven't already 🙂
   - Create a subdomain for your workers pages.

      Your Projects will be visible as `https://project.SUB_DOMAIN.workers.dev`

</details>

<details>

   <summary>
      <h3>2. Set up Project</h3>
   </summary>

   - Install node.js if haven't already 🙂
   - Install Wrangler as

      <pre>npm install wrangler --save-dev</pre>

   - Login with Cloudflare Account

      <pre>wrangler login</pre>

   - Clone This Repository

      <pre>git clone https://github.com/XronTrix10/Cloudflare-RESTful-D1.git</pre>

   - Rename `wrangler.sample.toml` file to `wrangler.toml`
   - Rename `sample.dev.vars` file to `.dev.vars`
   - Put a secret Auth Token in `.dev.vars` file. This Token will be used to Authenticate You with Your API
   - Put the auth token in Wrangler as well

      <pre>wrangler secret put AUTH_TOKEN</pre>

      Enter The Same Token you Placed inside `.dev.vars` file

   - Install dependencies

      <pre>npm install</pre>

   - Create a D1 Database in Cloudflare

      <pre>wrangler d1 create DATABASE_NAME</pre>
      
      <p><strong>📝 NOTE:</strong> Replace your own desired Database Name with <code>DATABASE_NAME</code></p>
      
      <p>On Hitting Enter, an ID of the created namespace will be returned.</p>

   - Put Binding in `wrangler.toml` file

      - Replace `<DATABASE_NAME>` with Your Chosen Database Name and `<unique-ID-for-your-database>` with the ID you got on Database Creation

      <p><strong>📝 NOTE:</strong> ❌ Don't Edit the Binding Name <code>binding = "DB"</code></p>

</details>

<details>

   <summary>
      <h3>3. Deploy Project</h3>
   </summary>

   - To Deploy/Test in Local

      <pre>wrangler dev</pre>

   - To Deploy in Cloudflare

      <pre>wrangler deploy</pre>

      <p><strong>📝 NOTE:</strong> You can change the project name by editing the <code>name</code> field from <code>wrangler.toml</code> file before deploying your project</p>


</details>

---

<h2>Hosted Demo 🐬</h2>

Live @[Cloudflare](https://restapi-d1.vilgax.workers.dev)

### Test

<pre>curl https://restapi-d1.vilgax.workers.dev</pre>

### Returns

<pre>Server is up and running!</pre>