import { JetBrains_Mono, Merriweather, Montserrat } from 'next/font/google';


const jetBrainsMonoBold = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains-mono-bold', 
  weight: '800' 
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono', 
  weight: '400' 
});

const merriweather = Merriweather({
  subsets: ['latin'], 
  variable: '--font-merriweather', 
  weight: '400'
});

const montserrat = Montserrat({
  subsets: ['latin'], 
  variable: '--font-montserrat', 
  weight: '400'
});



module.exports = {
    jetBrainsMonoBold, 
    jetBrainsMono, 
    merriweather, 
    montserrat
};
