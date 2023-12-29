import {BsFacebook} from 'react-icons/bs'
import {BsInstagram} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'
import {BsTwitter} from 'react-icons/bs'

function Footer() {

    const newDate=new Date()
    const year=newDate.getFullYear()
    return (
            <footer className="relative left-0 bottom-0 min-h-[10vh] py-5 flex gap-5 flex-col sm:flex-row items-center justify-between sm:px-20 test-white bg-gray-800">
                   <section className="text-lg">
                       Copyright {year} | All rights reserved
                   </section>
                   <section className="flex items-center justify-center gap-5 test-2xl text-white">
                       <a href="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                            <BsFacebook/>
                       </a>
                       <a href="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                            <BsInstagram/>
                       </a>
                       <a href="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                            <BsLinkedin/>
                       </a>
                       <a href="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                            <BsTwitter/>
                       </a>
                   </section>
                     
            </footer>

    );
}

export default Footer;