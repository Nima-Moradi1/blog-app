'use client'

import { FaGithub, FaTelegram, FaMapMarkerAlt } from 'react-icons/fa'
import { SiNextdotjs, SiReact, SiTailwindcss, SiNodedotjs, SiMongodb, SiTypescript, SiShadcnui, SiJest, SiExpress, SiRedux } from 'react-icons/si'
import Image from 'next/image'
import Header from '@/_components/Header'

export default function AboutMePage() {
  return (
    <>
    <Header className='mb-0 bg-slate-100'/>
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-lg rounded-3xl shadow-lg  overflow-hidden">
        <div className="flex flex-col md:flex-row bg-gray-800">
          {/* Profile Image */}
          <div className="w-full md:w-1/3 lg:w-3/5 relative aspect-square overflow-hidden">
            <Image
              src="/images/my-picture.jpg"
              alt="Nima's profile"
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-2/3 p-6 space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                Nima Moradi
              </h1>
              <p className="flex items-center gap-2 text-gray-300 mt-1">
                <FaMapMarkerAlt className="text-yellow-400 -mt-2" /> Based in Tehran, Iran 🇮🇷
              </p>
            </div>

            <p className="text-lg text-gray-200 *:mx-1" dir='ltr'>
              Im a passionate Frontend Developer developer with +4 years of expertise in Next.js, following some backend expertise with 
              <span className='font-bold text-green-600'>Express.js</span>
            focused on building scalable, beautiful, and high-performance web applications using modern technologies. My main stack includes 
              <span className="font-bold text-yellow-300">Next.js</span>, 
              <span className="font-bold text-sky-400">React</span>, 
              <span className="font-bold text-cyan-300">Tailwind CSS</span>, 
              <span className="font-bold text-green-400">Node.js</span>, and 
              <span className="font-bold text-emerald-300">MongoDB</span>.
               Iam in love with type-safe coding using 
               <span className="font-bold text-blue-400">TypeScript</span>
               and modern UI kits like <span className="font-bold text-pink-400">ShadCN UI</span>.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4" dir='ltr'>
              <TechIcon Icon={SiTypescript} label="TypeScript" color="text-blue-400" />
              <TechIcon Icon={SiReact} label="React" color="text-sky-400" />
              <TechIcon Icon={SiNextdotjs} label="Next.js" color="text-white" />
              <TechIcon Icon={SiTailwindcss} label="Tailwind" color="text-cyan-400" />
              <TechIcon Icon={SiShadcnui} label="ShadCN" color="text-pink-400" />
              <TechIcon Icon={SiRedux} label='Zustand' color='text-gray-300'/>
              <TechIcon Icon={SiNodedotjs} label="Node.js" color="text-green-400" />
              <TechIcon Icon={SiExpress} label="Express.js" color="text-gray-300" />
              <TechIcon Icon={SiMongodb} label="MongoDB" color="text-emerald-400" />
              <TechIcon Icon={SiJest} label="Jest" color="text-rose-400" />
            </div>

            <div className="flex gap-6 pt-4">
              <a href="https://github.com/Nima-Mor" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition text-xl flex items-center gap-2">
                <FaGithub /> <span>GitHub</span>
              </a>
              <a href="https://t.me/nimamoradi" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition text-xl flex items-center gap-2">
                <FaTelegram /> <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

function TechIcon({ Icon, label, color }: { Icon: any, label: string, color: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 transition shadow-md">
      <Icon className={`text-3xl ${color}`} />
      <span className="text-sm text-gray-300 mt-2 font-medium">{label}</span>
    </div>
  )
}