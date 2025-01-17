

const folhaDePergaminho = document.getElementById("pergaminhos")
const staffDireita = document.getElementById("staff-direita");
const staffEsquerda = document.getElementById("staff-esquerda");
let   capa = true;
const grimorio = document.getElementById("grimorio");
const folha = document.getElementById("papeis");
const pagEsquerda = folhaDePergaminho.children[0];
const pagDireita = folhaDePergaminho.children[1];
let NumeradorDaMagia = -1
let ctrl = true

class BuscarMagia {
  pontoDeBusca = 'https://www.dnd5eapi.co/api/spells/'

  buscaMagia() {
    return fetch(this.pontoDeBusca)
      .then(response => response.json())
      .then(data => {
        const magias = data.results
        return magias
      })
  }
}
class Magias extends BuscarMagia{
 
    async CriarPergaminho(){
      const Pergaminho = await buscarMagia.buscaMagia()
      return Pergaminho
    }

    async EscreverOsPergaminhos(){
      if(NumeradorDaMagia <=-1){
        
        NumeradorDaMagia= -1
        return
      }
      let pergaminhos = []
      await this.CriarPergaminho().then(Pergaminho => {
        this.pergaminhos = Pergaminho.map( () =>
        { 
          
          return pergaminhos = Pergaminho
          }
          )
       
    }).catch(error => {
      console.error(error)
    })
    this.SlotDaMagia(pergaminhos)

    }

    SlotDaMagia(pergaminhos ) {
   
      const indentificadorMagia = pergaminhos?.[NumeradorDaMagia]?.index
      const pontoMagico= this.pontoDeBusca+indentificadorMagia
      
      
      this.MoldarPergaminho(pontoMagico)
      
  
    }
    
    async MoldarPergaminho(pontoMagico) {
   
      if(pontoMagico == 'https://www.dnd5eapi.co/api/spells/undefined'){
     
        return
      
      }
      const magica = await fetch(pontoMagico)?.then(resposta => {
        let transmute = resposta.json()
        
        return transmute
      })  
      const { name, school, classes, ...resto } = magica

      const Magika = {
        nome: name,
        escola: school?.name,
        classes,
        resto
      }
      
      
      
      this.EscreveMagika ({Magika})
    } 
    
    EscreveMagika ({Magika})  { 
      let concentration = `<img src='' alt=''class='concentration'/>`
      let componentes= Magika.resto.components

      if(Magika.resto.concentration){
        
        concentration = `<abbr title='Concentração'><img src="assets/Componentes/Concentração.png" class='concentration' alt=""></abbr>`
      }
      

      const magikaEscrita = `
      <div class="titulo">
      <h1 id='Concentra'><a href="https://www.dndbeyond.com/spells/${Magika.resto.index}" target="_blank">${Magika.nome}</a></h1>
        ${concentration}
      </div>
      
      <div class="componentes">
        ${componentes.map(
          componente=>{
           
            switch (componente) {
              case 'V':
                return `<abbr title='Verbal'><img src="assets/Componentes/Verbal.png" alt=""></abbr>`
              case 'S':
                return `<abbr title='Gestual'><img src="assets/Componentes/Gestal.png" alt=""></abbr>`
              case 'M':
                return `<abbr title='Material'><img src="assets/Componentes/Material.png" alt=""></abbr>`
              default:
                return ''
            }
          }
        ).join('')}
      </div>

      <div class="escola">
       <span>Escola: ${Magika.escola}</span>
         <img src="assets/Escolas/${Magika.escola}.png" alt="">
      </div>

        <ul class="classes">
          <span> Classes</span>
            ${Magika.classes.map(classe => 
              `<li>
                <span>${classe.name}</span>
                <img src="assets/Classes/${classe.name}.png" alt="">
              </li>`).join('')}
        </ul>
              `

            this.MostrarMagikaDireita(magikaEscrita)
            if (ctrl) {
        
              this.MostrarMagikaEsquerda({magikaEscrita,Magika})
              return
          }  
        
    }
    MostrarMagikaDireita(Magika){
      
      pagDireita.innerHTML = Magika

    }
    MostrarMagikaEsquerda({magikaEscrita,Magika}) {
     
      let pergaminhoPadrao=this.pergaminhos[0]
      let magiaAtual = pergaminhoPadrao.filter((posi) =>posi.index==Magika.resto.index)
      let indexDaMagiaAtual = pergaminhoPadrao.findIndex((posi)=> posi.index==magiaAtual[0].index)
     
      const prox = async ()=> {await this.MoldarPergaminho(this.pontoDeBusca+proximaMagia)}
      
      let proximaMagia = pergaminhoPadrao.slice((indexDaMagiaAtual + 1) % pergaminhoPadrao.length, (indexDaMagiaAtual+ 2) % pergaminhoPadrao.length)[0].index
    
      if (ctrl) {
      
        prox()
        ctrl = false
    }  
     pagEsquerda.innerHTML = magikaEscrita
     
    }
  }
 
class ForjaGrimorio extends Magias{

  
  async abrirGrimorio() {
    NumeradorDaMagia++
    await TrazMagika()
    
    if (capa) {
      grimorio.classList.add("aberto");
      
      folha.classList.remove("aberto");
      folhaDePergaminho.classList.remove("aberto");
      pagEsquerda.classList.remove("aberto");
      pagDireita.classList.remove("aberto");
      capa = false;
      
    }
    this.passaPagina()
  }
   
  async fecharGrimorio() {
 
    NumeradorDaMagia--
 
    await TrazMagika()
    this.passaPagina()
    if (!capa && NumeradorDaMagia < 0) {
      grimorio.classList.remove("aberto");
      
      folha.classList.add("aberto");
      folhaDePergaminho.classList.add("aberto");
      pagEsquerda.classList.add("aberto");
      pagDireita.classList.add("aberto");
      capa = true;
      NumeradorDaMagia = 0
    }
 
  }
  
  passaPagina() {
    const folha = new Audio(
      "https://blobsound.com/wp-content/uploads/2020/03/Som-de-pagina-virando-Sons-Trilhas-e-efeitos-sororos-gr%C3%A1tis.mp3"
    );

    folha.play();
  }


  
}


async function TrazMagika(){
  ctrl= true
  await magia.EscreverOsPergaminhos() 
}

const magia = new Magias()
const buscarMagia = new BuscarMagia()
const forja= new ForjaGrimorio()


staffDireita.addEventListener('click', () => forja.abrirGrimorio())
staffEsquerda.addEventListener('click', () =>{forja.fecharGrimorio()})

