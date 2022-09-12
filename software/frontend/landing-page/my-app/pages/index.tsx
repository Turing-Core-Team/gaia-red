import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Infodiv from '../componentes/Div-info'
import styles from '../styles/Home.module.css'
import Navbar from '../componentes/NavBar'
import Layout from '../componentes/layout'
import Grid from '../componentes/grid-inicio'
import Link from 'next/link'
import SectionInicio from '../componentes/section-inicio'
import Miembro from '../componentes/miembro_equipo'

const Home: NextPage = () => {

  const irForms = () => {
    window.open("https://forms.gle/SzoHZUKrLriKTpYq7", "_blank");

  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Gaia-Red</title>
        <meta name="pagina gaiared" content="descripcion breve del proyecto" />
        <link rel="icon" href="/arbolito.ico" />
      </Head>
      {/*<Infodiv></Infodiv>*/}
      <div id="top"></div>
      <Navbar  ></Navbar>

      <main className={styles.main}>
        <Layout>

          <h1 className={styles.title} >
            Gaia Red
          </h1>

          <p className={styles.texto}><strong>Monitorea tus cultivos</strong></p>
          <button className={styles.botonesInicio}>
            <Link href='#inicio' >
              <a>Más Información</a>
            </Link>

          </button>
          <div id="inicio"></div>
        </Layout>
        <h2 className={styles.Subtitulos}>Acerca de </h2>
        <p className={styles.textoComun} >En Colombia la mayoría de cultivos productivos son pocos tecnificados y no cuentan con acceso a internet, el cual puede ser una herramienta fundamental para empezar a aplicar tecnologías 4.0 en el sector agrícola. Por ello nace <strong>Gaia Red</strong>, un proyecto que lleva la tecnificación al campo colombiano. Buscamos que los cultivos sean monitoreados de modo que se puedan analizar para poder tomar decisiones que ayuden a mejorar la calidad de las cosechas.
        </p>

        <Grid>
          <Infodiv {...["01", "Monitoreo de cultivos en tiempo real", "El monitoreo en tiempo real ayuda a conocer el estado del cultivo y así saber lo que necesita para crecer."]} />
          <Infodiv {...["02", "Revisión y control de riego", "El control de riego aporta la cantidad necesaria de agua en el momento que se necesita, humedeciendo el suelo hasta la profundidad que requiera el cultivo, con el fin de que este tenga un correcto desarrollo"]} />
          <Infodiv {...["03", "Mejoras en la calidad del cultivo", "A partir del monitoreo, la revisión de factores como el riego y el análisis de estos datos es posible lograr aumentar la calidad del cultivo, disminuyendo perdidas y añadiendo valor a la producción de alimentos en el país."]} />
          {/*<Infodiv {...["04","Monitoreo de cultivos en tiempo real","Explicación para inexpertos de como se genera la información"]}/>*/}
        </Grid>
        <div id="Quienes"></div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <SectionInicio>
          <article className={styles.divfondoBlanco}>
            <h2 className={styles.SubtitulosDer} >Quiénes Somos</h2>
            <section className={styles.flexFoto}>
              <div><Image 
              src="/../public/foto-gaia.jpg"  alt="equipo gaia-red" layout='fixed' height={200}   
              width={300}
              /></div>

              <p>Gaia Red es un grupo interdisciplinar de estudiantes apasionados
                por el internet de las cosas, los microcontroladores, y en darle una
                oportunidad de modernización al campo colombiano. Con nuestro
                proyecto buscamos mejorar la productividad de los cultivos al tiempo
                que brindamos una solución tecnológica.</p >

            </section>
          </article>
          <div id="Equipo"></div>
          <br></br>
          <br></br>
          <h2 className={styles.SubtitulosC} >El equipo</h2>
          <section className={styles.gridEquipo}>
            <Miembro {...["Fabian López", "Ingeniero Electronico", "/../public/miembro_ref.jpeg"]}></Miembro>
            <Miembro {...["Maria Paula Perez", "Ingeniera Electronica", "/../public/miembro_ref.jpeg"]}></Miembro>
            <Miembro {...["Juan Manuel Cortes", "Ingeniero de Sistemas", "/../public/miembro_ref.jpeg"]}></Miembro>
            <Miembro {...["Santiago Acosta", "Ingeniero Electronico", "/../public/miembro_ref.jpeg"]}></Miembro>
            <Miembro {...["Camila Piñeros", "Diseñadora Industrial", "/../public/miembro_ref.jpeg"]}></Miembro>

          </section>
          <div id="Apoyo"></div>
          <br></br>
          <br></br>
          <div className={styles.divfondoBlanco}>
            <h2 className={styles.SubtitulosC} >Apoyos</h2>
            <div className={styles.flexApoyo}>
            <a
                href="https://unal.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/../public/logo_un.png" alt="logo png" width={153} height={153} layout='fixed' />
              </a>
              <a
                href="http://bienestar.bogota.unal.edu.co/pgp/micrositio/Index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/../public/logo_pgp.png" alt="logo png" width={138} height={140} layout='fixed' />
              </a>
              

              <span id="Contacto"></span>
            </div>

          </div>

          <h2 className={styles.SubtitulosIzq} >Contacto</h2>

          <section className={styles.flexContacto}>
            <h1 className={styles.titulosNegros}>Trabajemos Juntos</h1>
            <p>Si quieres trabajar con nosotros...</p>
            <button className={styles.botonesInicio} onClick={irForms}>Haz click aquí</button>
            <p>Redes sociales</p>
            <span className={styles.flexLogos}>
              <span >

                <a
                  href="https://www.linkedin.com/company/turingbox/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/linkedin.png" alt="Linked In Turing" width={40} height={40} />
                </a>
              </span>
              <span >

                <a
                  href="https://github.com/Turing-Core-Team/gaia-red"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/github.png" alt="Github Turing" width={40} height={40} />
                </a>

              </span>
              <span>
                <a
                  href="https://www.instagram.com/turingbox/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/instagram.png" alt="Instagram Turing" width={40} height={40} />
                </a>
              </span>
            </span>
          </section>
        </SectionInicio>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://turingbox.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Un proyecto de {' '}
          <span className='fotospeque'>
            <Image src="/turinglogo.png" alt="Logo turing" width={120} height={40} />
          </span>

        </a>
      </footer>
    </div>
  )
}

export default Home
