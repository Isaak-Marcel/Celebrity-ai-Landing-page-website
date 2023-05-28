import Head from "next/head";
import Hero from "../components/hero";
import Navbar, { Popups } from "../components/navbar";
import SectionTitle from "../components/sectionTitle";

import { benefitOne, benefitTwo } from "../components/data";
import Video from "../components/video";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Cta from "../components/cta";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";
import Subscribe from "../components/Subscribe"
import { useContext, useState } from "react";

import { AuthProvider } from "../components/AuthContext";
import Login from "../components/Login";
import Signup from "../components/Signup";




const Home = () => {
  const [sl, setSl] = useState(false)
  const [ss,setSs] = useState(false)

  

  const close = (x)=>{
      setSl(false)
      setSs(false)
      if(x ==='login'){
          setSl(true)
      }else if(x ==='signup'){
          setSs(true)
      }
  }
 
  return (
    <>
        
        <Head>
          <title>Nextly - Free Nextjs & TailwindCSS Landing Page Template</title>
          <meta
            name="description"
            content="Nextly is a free landing page template built with next.js & Tailwind CSS"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      
     
      <AuthProvider>
        {(ss || sl) && <div className={`flex justify-center items-center fixed h-screen w-full ${ss || sl ? 'blur-background' : ''}`}>
          {sl && <Login close={close}/>}
          {ss && <Signup close={close}/> }
        </div>}
        <Navbar ss={ss} sl={sl} setSl={setSl} setSs={setSs}/>
        <Hero> 
          
        </Hero>
        
    
        <SectionTitle
          pretitle="Text Enhancer"
          title="Improve, check and speed up writing ">
         
         Our text enhancer chrome extension lets you use different features to improve your work speed such 
         as Improve text, Spell Fix, find best fitting word, continue the text.
         
        </SectionTitle>
        <Benefits data={benefitOne} />
        {/* <Benefits imgPos="right" data={benefitTwo} /> */}
        <Subscribe/>
        <SectionTitle
          pretitle="Full tutorial to get the most of the chrome extension video"
          title="Learn how to fullfil your needs">
          This section is to highlight a promo or demo video of your product.
          Analysts says a landing page with video has 3% more conversion rate. So,
          don&apos;t forget to add one. Just like this.
        </SectionTitle>
        <Video />
        {/* <SectionTitle
          pretitle="Testimonials"
          title="Here's what our customers said">
          Testimonails is a great way to increase the brand trust and awareness.
          Use this section to highlight your popular customers.
        </SectionTitle>
        <Testimonials />
        <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
          Answer your customers possible questions here, it will increase the
          conversion rate as well as support or chat requests.
        </SectionTitle>
        <Faq />
        <Cta /> */}
        <Footer />
        <PopupWidget />
      </AuthProvider>
    </>
  );
}

export default Home;