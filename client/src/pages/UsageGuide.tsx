import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar.tsx'
import Footer from '../components/Footer.tsx'

const UsageGuide: React.FC = () => {

    const pageRef = useRef(null)

    useEffect(() => {
        //@ts-ignore
        pageRef.current.scrollIntoView()
        document.title = `UIGrades | Usage Guide` 
    }, [])

    return (
        <div ref={pageRef} className="w-full flex justify-center items-center flex-col relative min-h-screen bg-dark">
        <Navbar />
            <div className='mt-8 pb-8 flex flex-col items-start justify-start gap-32 min-h-screen w-3/4 md:text-justify text-zinc-300 leading-relaxed'>
                <div className='flex flex-col items-start justify-start gap-5'>
                <h1 className='md:text-5xl text-3xl text-primary font-bold underline-offset-[10px]'>Disclaimer</h1>
                <p className='text-lg md:text-2xl font-extralight'>UIGrades is an objective data-based tool for students to visualize past semester courses’ grade distributions at the University of Iowa. If you’re using UIGrades to select classes to take, please use it in conjunction with <a href="https://myui.uiowa.edu/my-ui/home.page" target='_blank' className='text-primary'>MyUI</a>. Grade distributions are not necessarily an indicator of course difficulty nor a reflection on the instructor or department rewarding those grades. There are several factors that determine the ultimate grade distribution of a course, difficulty being only one. Additionally, UIGrades is not a substitute for an advising appointment. Please see your <a href="https://advisingcenter.uiowa.edu/contact" target='_blank' className='text-primary'>designated academic advisor</a> for questions about your proposed course schedule.</p>
                </div>
                <div className='flex flex-col items-start justify-start gap-5'>
                <h1 className='md:text-5xl text-3xl text-primary font-bold underline-offset-[10px]'>Helpful Resources</h1>
                <ul className='list-disc list-inside text-lg md:text-2xl text-zinc-300 font-extralight'>
                    <li><a href="https://myui.uiowa.edu/my-ui/home.page" target='_blank' className='hover:text-primary transition duration-500'>MyUI</a></li>
                    <li><a href="https://advisingcenter.uiowa.edu/contact" target='_blank' className='hover:text-primary transition duration-500'>Academic Advising</a></li>
                    <li><a href="https://registrar.uiowa.edu/academic-calendar" target='_blank' className='hover:text-primary transition duration-500'>Academic Calendar</a></li>
                    <li><a href="https://www.uiowa.edu/students" target='_blank' className='hover:text-primary transition duration-500'>Student Resources</a></li>
                </ul>
                </div>
            </div>
        <Footer />
        </div>
    );
}

export default UsageGuide