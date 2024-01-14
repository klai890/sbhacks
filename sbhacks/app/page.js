import Image from 'next/image'
import ucsbdata from '../../data/ucsb_data.json'
import ucsddata from '../../data/UCSD_data.json'
import ucbdata from '../../data/Berkeley_data.json'

export default function Home() {

  var determineColor = (sent) => {
    var color;
    if (sent < 0.25){
      color = "#b50c04"
    }
    else if (sent < 0.5) {
      color = "#a85c58"
    }
    else if (sent < 0.75) {
      color = "#4a825a"
    }
    else{
      color = "#018025"
    }
    return color;
  }

  return (
    <main>
      <h1>What's X College Like?</h1>
       <p>Sentiment Analysis of College Subreddits</p>  
       <p>For curious college-bound students!</p>  
       <p>The greener the better, the more red, the worse.</p>  
       <p>Each box represents a topic, and the color represents the sentiment</p>
      <br />

      <h1>View a college...</h1>

      
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
              <div class = "clusters">
                {ucsbdata['ucsb'].map(({samples, sentiment}) => (
                  <div>
                    <div class="cluster" style={{background: determineColor(sentiment)}}>
                      {samples.map((s) => (<p>{s}</p>))}
                    </div>
                  </div>
                ))
                } 
              </div>

          </div>

          <h2 id="c1">UCSD</h2>

           <div class="college">
              <img src="https://cdn.siter.io/assets/ast_vRJtruF1Tyez4cdN7m1NoGTUo/5f0a683c-d17e-4f0b-80c5-eb356a44e7d6.webp" alt="" class='logo'/>
              
              <div class = "clusters">
                {ucsddata['UCSD'].map(({samples, sentiment}) => (
                  <div>
                    <div class="cluster" style={{background: determineColor(sentiment)}}>
                      {samples.map((s) => (<p>{s}</p>))}
                    </div>
                  </div>
                ))
                } 


          </div>

          </div>
          <h2 id="c2">UC Berkeley</h2>
           <div class="college">
              <img src="https://cdn.siter.io/assets/ast_QJXaA9EkGFjZgzy9NN4sydwB6/aa3c2b99-b49d-4bd0-a76c-cd18f326d57b.webp" alt="" class='logo'/>
                <div class="clusters lastcluster">
                  {ucbdata['Berkeley'].map(({samples, sentiment}) => (
                    <div>
                        <div class="cluster" style={{background: determineColor(sentiment)}}>
                          {samples.map((s) => (<p>{s}</p>))}
                        </div>
                    </div>
                  ))
                  }  
                </div>

          </div>
      </div>

    </main>
  )
}
