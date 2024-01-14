import Image from 'next/image'
import data from '../../data.json'

export default function Home() {

  return (
    <main>
      <h1>What's X College Like?</h1>
       <h3>Courtesy of College Subreddits</h3>

      <br />

      <h1>Pick your college...</h1>

      
      <div class='wrapper'>
          <ul id="buttons">
              <li><a href="#c0">UCSB</a></li>
              <li><a href="#c1">UCSD</a></li>
              <li><a href="#c2">UC Berkeley</a></li>
          </ul>
      </div>
      
      <div class="section">
          <h2 id="c0">UCSB</h2>

          <div class="college">
              <img src="https://cdn.siter.io/assets/ast_F3BK6dFJNq9D9GRLHGMuspuuU/259bd2ac-4061-461f-b13f-7fdb02cae652.webp" alt="" class='logo'/>

              {data['ucsb'].map(({samples, sentiment, n}) => (
                <div>
                  <div class="cluster">
                    {samples.map((s) => (<p>{s}</p>))}
                  </div>
                  <p>{sentiment}</p>
                  <p>{n}</p>
                </div>
              ))
              } 

          </div>

          <h2 id="c1">UCSD</h2>

           <div class="college">
              <img src="https://cdn.siter.io/assets/ast_vRJtruF1Tyez4cdN7m1NoGTUo/5f0a683c-d17e-4f0b-80c5-eb356a44e7d6.webp" alt="" class='logo'/>

              {data['ucsd'].map(({samples, sentiment, n}) => (
                <div>
                  <p>Samples: {samples.map((s) => (<h1>{s}</h1>))}</p>
                  <p>{sentiment}</p>
                  <p>{n}</p>
                </div>
              ))
              }  

          </div>
          <h2 id="c2">UC Berkeley</h2>
           <div class="college">
              <img src="https://cdn.siter.io/assets/ast_QJXaA9EkGFjZgzy9NN4sydwB6/aa3c2b99-b49d-4bd0-a76c-cd18f326d57b.webp" alt="" class='logo'/>

              {data['ucb'].map(({samples, sentiment, n}) => (
                <div>
                  <p>Samples: {samples.map((s) => (<h1>{s}</h1>))}</p>
                  <p>{sentiment}</p>
                  <p>{n}</p>
                </div>
              ))
              }  

          </div>
      </div>

    </main>
  )
}
