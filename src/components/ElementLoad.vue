<template>
<body v-if="dohvati">
    <div class="Sve">
      
      <div class="VanjskaGrupacija">
        <div class="Grupacija">
          <div class="PSEOPCE">
            <div :class="dohvati.Vrsta"> <!--Promjeni-->
              <div class="AtomskiBroj">{{ dohvati.ProtonskiBroj }}</div>
              <div :class="dohvati.SimbolVrsta">{{ dohvati.Simbol }}</div>
              <div class="Ime">{{ dohvati.Ime }}</div>
              <div class="Relativna">{{ dohvati.Relativna }}</div>
            </div>
            <table class="Tabla2">
              <tr class="DD"> <td class="Dvadeset">Simbol</td><td class="Deset">{{ dohvati.Simbol }}</td> </tr>
              <tr class="DD"> <td class="Dvadeset">Broj protona</td><td class="Deset">{{ dohvati.ProtonskiBroj }}</td> </tr>
              <tr class="DD"> <td class="Dvadeset">Broj elektrona</td><td class="Deset">{{ dohvati.ProtonskiBroj }}</td> </tr>
              <tr class="DD"> <td class="Dvadeset">Broj neutrona</td><td class="Deset">{{ dohvati.Neutroni }}</td> </tr>
              <tr class="DD"> <td class="Dvadeset">Agregatno stanje</td><td class="Deset">{{ dohvati.Agregatno }}</td> </tr>
              <tr class="DD"> <td class="Dvadeset">Talište</td><td class="Deset">{{ dohvati.Talište }} °C</td> </tr>
              <tr class="DD"> <td class="Dvadeset">Vrelište</td><td class="Deset">{{ dohvati.Vrelište }} °C</td> </tr>
              <tr class="DD"> <td class="Dvadeset">Radioaktivan</td><td class="Deset">{{ dohvati.Radioaktivan }}</td> </tr>
              <tr class="DD"> <td class="Dvadeset">Umjetno dobiven</td><td class="Deset">{{ dohvati.Umjetan }}</td> </tr>
              <tr class="DD"> <td class="Dvadeset">Relativna atomska masa</td><td class="Deset">{{ dohvati.PunaRelativna }}</td> </tr>
            </table>
          </div>

          <table class="Table" >
            <tr><th colspan="6" class="tst" style="height: 1.5vw; padding: 0.2vw;">Sastav izotopne smjese</th></tr>
            <tr>
              <th class="tst">Izotop</th>
              <th class="tst">Vrijeme poluraspada</th>
              <th class="tst">Vrsta poluraspada</th>
              <th class="tst">Produkt poluraspada</th>
              <th class="tst">U prirodi (%)</th>
              <th class="tst">Radioaktivan</th>
            </tr>
            <tr v-if="DohvatiIzotope.Izotop">
              <td class="tst"><div v-html="DohvatiIzotope.Izotop"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme !== null" class="tst"><div v-html="DohvatiIzotope.Vrijeme"></div></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa !== null" class="tst"><div v-html="DohvatiIzotope.VrstaIzotopa"></div></td>
              <td v-if="DohvatiIzotope.Produkt !== null" class="tst"><div v-html="DohvatiIzotope.Produkt"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme === null" class="tstNema"></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa === null" class="tstNema">Stabilan</td>
              <td v-if="DohvatiIzotope.Produkt === null" class="tstNema"></td>
              <td class="tst">{{DohvatiIzotope.Priroda}}</td>
              <td class="tst">{{DohvatiIzotope.RadioIzotop}}</td>
            </tr>
            <tr v-if="DohvatiIzotope.Izotop2">
              <td class="tst"><div v-html="DohvatiIzotope.Izotop2"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme2 !== null" class="tst"><div v-html="DohvatiIzotope.Vrijeme2"></div></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa2 !== null" class="tst"><div v-html="DohvatiIzotope.VrstaIzotopa2"></div></td>
              <td v-if="DohvatiIzotope.Produkt2 !== null" class="tst"><div v-html="DohvatiIzotope.Produkt2"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme2 === null" class="tstNema"></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa2 === null" class="tstNema">Stabilan</td>
              <td v-if="DohvatiIzotope.Produkt2 === null" class="tstNema"></td>
              <td class="tst">{{DohvatiIzotope.Priroda2}}</td>
              <td class="tst">{{DohvatiIzotope.RadioIzotop2}}</td>
            </tr>
            <tr v-if="DohvatiIzotope.Izotop3">
              <td class="tst"><div v-html="DohvatiIzotope.Izotop3"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme3 !== null" class="tst"><div v-html="DohvatiIzotope.Vrijeme3"></div></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa3 !== null" class="tst"><div v-html="DohvatiIzotope.VrstaIzotopa3"></div></td>
              <td v-if="DohvatiIzotope.Produkt3 !== null" class="tst"><div v-html="DohvatiIzotope.Produkt3"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme3 === null" class="tstNema"></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa3 === null" class="tstNema">Stabilan</td>
              <td v-if="DohvatiIzotope.Produkt3 === null" class="tstNema"></td>
              <td class="tst">{{DohvatiIzotope.Priroda3}}</td>
              <td class="tst">{{DohvatiIzotope.RadioIzotop3}}</td>
            </tr>
            <tr v-if="DohvatiIzotope.Izotop4">
              <td class="tst"><div v-html="DohvatiIzotope.Izotop4"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme4 !== null" class="tst"><div v-html="DohvatiIzotope.Vrijeme4"></div></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa4 !== null" class="tst"><div v-html="DohvatiIzotope.VrstaIzotopa4"></div></td>
              <td v-if="DohvatiIzotope.Produkt4 !== null" class="tst"><div v-html="DohvatiIzotope.Produkt4"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme4 === null" class="tstNema"></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa4 === null" class="tstNema">Stabilan</td>
              <td v-if="DohvatiIzotope.Produkt4 === null" class="tstNema"></td>
              <td class="tst">{{DohvatiIzotope.Priroda4}}</td>
              <td class="tst">{{DohvatiIzotope.RadioIzotop4}}</td>
            </tr>
            <tr v-if="DohvatiIzotope.Izotop5">
              <td class="tst"><div v-html="DohvatiIzotope.Izotop5"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme5 !== null" class="tst"><div v-html="DohvatiIzotope.Vrijeme5"></div></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa5 !== null" class="tst"><div v-html="DohvatiIzotope.VrstaIzotopa5"></div></td>
              <td v-if="DohvatiIzotope.Produkt5 !== null" class="tst"><div v-html="DohvatiIzotope.Produkt5"></div></td>
              <td v-if="DohvatiIzotope.Vrijeme5 === null" class="tstNema"></td>
              <td v-if="DohvatiIzotope.VrstaIzotopa5 === null" class="tstNema">Stabilan</td>
              <td v-if="DohvatiIzotope.Produkt5 === null" class="tstNema"></td>
              <td class="tst">{{DohvatiIzotope.Priroda5}}</td>
              <td class="tst">{{DohvatiIzotope.RadioIzotop5}}</td>
            </tr>
          </table>
        </div>
      </div>

      
     
      
      <div class="VanjskaGrupacija">
        <div class="O-elementu">
          <div class="Pgraf">
            <div>
              <div v-if="dohvati.Paragraf1">
                <div v-html="dohvati.Paragraf1"></div>
              </div>
              <div v-if="dohvati.Paragraf2">
                <div v-html="dohvati.Paragraf2"></div>
              </div>
              <div v-if="dohvati.Paragraf3">
                <div v-html="dohvati.Paragraf3"></div>
              </div>
              <div v-if="dohvati.Paragraf4">
                <div v-html="dohvati.Paragraf4"></div>
              </div>
              <div v-if="dohvati.Paragraf5">
                <div v-html="dohvati.Paragraf5"></div>
              </div>
              <div v-if="dohvati.Paragraf6">
                <div v-html="dohvati.Paragraf6"></div>
              </div>
              <div v-if="dohvati.Paragraf7">
                <div v-html="dohvati.Paragraf7"></div>
              </div>
              <div v-if="dohvati.Paragraf8">
                <div v-html="dohvati.Paragraf8"></div>
              </div>
              <div v-if="dohvati.Paragraf9">
                <div v-html="dohvati.Paragraf9"></div>
              </div>
              <div v-if="dohvati.Paragraf10">
                <div v-html="dohvati.Paragraf10"></div>
              </div>
              <div v-if="dohvati.Paragraf11">
                <div v-html="dohvati.Paragraf11"></div>
              </div>
              <div v-if="dohvati.Paragraf12">
                <div v-html="dohvati.Paragraf12"></div>
              </div>
              <div v-if="dohvati.Paragraf13">
                <div v-html="dohvati.Paragraf13"></div>
              </div>
              <div v-if="dohvati.Paragraf14">
                <div v-html="dohvati.Paragraf14"></div>
              </div>
              <div v-if="dohvati.Paragraf15">
                <div v-html="dohvati.Paragraf15"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="VanjskaGrupacija">
        <div class="ElekKonf">
          <div class="EKONFKONF">Elektronska konfiguracija</div>
          <div class="EKF">
            
            <div  class="DDD">
              <div class="DDDD"> <div style="padding-bottom: 0.5vw;">Obična notacija:&nbsp;</div><div class="ObicnaNotacija" style="margin-top: -0.3vw;" v-html="dohvati.ObicnaNotacija"></div></div>
              <div style="display: flex; flex-direction: column; align-items: center; height: 2vw; margin-top: 1vw;" class="DDDDD"> <div>Notacija pomoću plemenitog plina:&nbsp;</div><div class="NotacijaPlemenitogPlina" style="margin-top: 0.3vw;" v-html="dohvati.NPPP"></div></div>
            </div>

            <div class="SPDFNotacija">
              <div v-html="dohvati.SPDF"></div>
            </div>
          </div>
        </div>
      </div>
      
      <UcitavanjeMinerala :OdabraniMineral="dataProp"/>
      



    </div>

    
    <PodnozjeStranice/>
    
    </body>

</template>

<script>
// Import necessary Firebase modules
import db from "/VueProjekt/src/firebase/init.js";
import { doc, getDoc } from "/VueProjekt/node_modules/firebase/firestore/dist/firestore/index.d.ts";
import PodnozjeStranice from "./PodnozjeStr.vue";
import UcitavanjeMinerala from "./UcitavanjeMinerala.vue";













export default {
  components: {
    PodnozjeStranice,
    UcitavanjeMinerala,
  },


  props: ['dataProp'],
  data() {
    return {
      dohvati: null,
      //processedParagraph5: null,
      minerali: [], // NOVO
    };
  },
  
  created() {
    this.getSimbol();
    document.title = 'Element - ' + this.dataProp;
  },
  methods: {
    
    async getSimbol() {
      try {
        // Get the document snapshot
        const docSnap = await getDoc(doc(db, 'Elementi', this.dataProp));
        if (docSnap.exists()) {
          // Set the data to the retrieved document data
          const docSnap2 = await getDoc(doc(db, 'Elementi', this.dataProp, 'Izotop', 'Izotopi'));
          if (docSnap2.exists()){
            this.DohvatiIzotope = docSnap2.data();
          }
          this.dohvati = docSnap.data();
          //this.processParagraphs();
        }else {
          // Handle case where document doesn't exist
          this.$emit('elementNotFound');
        }
      }catch (error) {
        console.error('Error getting document:', error);
      }
      
    },
    
    /*processParagraphs() {                               // KORISTI AKO SE SLIKE ZAJ*BU
      if (this.dohvati && this.dohvati.Paragraf1) {
        // Initialize processedParagraphs array
        this.processedParagraphs = [];

        // Loop through each paragraph
        let combinedContent = '';
        for (let i = 1; i <= 15; i++) {
          const paragraphKey = `Paragraf${i}`;
          const paragraphContent = this.dohvati[paragraphKey];
          
          // If the paragraph contains the img tag, replace its src attribute
          if (paragraphContent && paragraphContent.includes('<img')) { // UVJET PRILAGODI 1
            const updatedContent = paragraphContent.replace(
              /<img\s+src="([^"]*)"/g,
              `<img src="${this.dohvati.Slika1}"`
            );
            //this.processedParagraphs.push(updatedContent);
            combinedContent += updatedContent;



          } else if (paragraphContent && paragraphContent.includes('<img src="dohvati.Slika2"')){ // UVJET PRILAGODI 2
            const updatedContent = paragraphContent.replace(
              /<img\s+src="([^"]*)"/g,
              `<img src="${this.dohvati.Slika2}"`
            );
            //this.processedParagraphs.push(updatedContent);
            combinedContent += updatedContent;


          } else{
            // If the paragraph does not contain the img tag, push it as is
            //this.processedParagraphs.push(paragraphContent);
            combinedContent += paragraphContent || '';
          }
        }
        this.processedParagraphs = combinedContent;
      }
    }*/
    /*processParagraph5() {
      if (this.dohvati && this.dohvati.Paragraf5) {
        // Create a copy of paragraph5 content
        let processedContent = this.dohvati.Paragraf5;

        // Replace the placeholder with the actual image URL
        if (this.dohvati.Slika1) {
          processedContent = processedContent.replace(
            /<img\s+src="dohvati\.Slika1"\s>/g,
            `<img src="${this.dohvati.Slika1}">`
          );
        }
        if (this.dohvati.Slika2) {
          processedContent = processedContent.replace(
            /<img\s+src="dohvati\.Slika2"\s>/g,
            `<img src="${this.dohvati.Slika2}">`
          );
        }
        // Assign the processed content to the processedParagraph5 data property
        this.processedParagraph5 = processedContent;
      }
    }*/
  }
};
</script>
