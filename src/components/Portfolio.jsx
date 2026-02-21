import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        id: 1,
        title: 'Interior Living Room Render',
        category: 'Interior Design',
        software: ['3ds Max', 'Corona Renderer', 'Photoshop'],
        desc: 'A warm, modern living room visualization featuring soft natural lighting, layered textures, and carefully curated furniture arrangement. Every surface meticulously detailed to achieve photorealistic quality.',
        color: '#C4B5A8',
        accent: '#8B7A6F',
    },
    {
        id: 2,
        title: 'Modern Bedroom Visualization',
        category: 'Interior Design',
        software: ['3ds Max', 'Corona Renderer'],
        desc: 'Contemporary bedroom design with minimalist aesthetic. Emphasis on material realism — from woven fabrics to polished surfaces — with expertly balanced artificial and ambient lighting.',
        color: '#B8A99A',
        accent: '#7A6B5F',
    },
    {
        id: 3,
        title: 'Exterior Architectural Visualization',
        category: 'Architecture',
        software: ['3ds Max', 'Corona Renderer', 'Forest Pack'],
        desc: 'Full exterior visualization of a contemporary residential building. Includes landscape design, golden hour lighting simulation, and atmospheric depth for a cinematic presentation.',
        color: '#A89888',
        accent: '#6B5C50',
    },
    {
        id: 4,
        title: 'Commercial Space Render',
        category: 'Commercial',
        software: ['3ds Max', 'Corona Renderer', 'Photoshop'],
        desc: 'Large-scale commercial interior featuring open-plan office design with collaborative zones. Emphasis on brand identity through material selection and spatial organization.',
        color: '#968880',
        accent: '#5E5048',
    },
    {
        id: 5,
        title: 'Unreal Engine Real-time Scene',
        category: 'Real-time 3D',
        software: ['Unreal Engine', 'Quixel Bridge', 'Lumen'],
        desc: 'Interactive real-time architectural visualization built in Unreal Engine 5 with Lumen global illumination. Fully navigable walkthrough with dynamic time-of-day lighting.',
        color: '#847770',
        accent: '#4E4540',
    },
]

export default function Portfolio() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const itemsRef = useRef([])
    const [activeProject, setActiveProject] = useState(null)
    const modalRef = useRef(null)
    const overlayRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
                }
            )

            itemsRef.current.forEach((item, i) => {
                if (!item) return
                gsap.fromTo(item,
                    { opacity: 0, y: 70 },
                    {
                        opacity: 1, y: 0, duration: 0.9, delay: (i % 3) * 0.15, ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const openProject = (project) => {
        setActiveProject(project)
        setTimeout(() => {
            if (overlayRef.current && modalRef.current) {
                gsap.fromTo(overlayRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.4, ease: 'power2.out' }
                )
                gsap.fromTo(modalRef.current,
                    { opacity: 0, y: 60, scale: 0.96 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
                )
            }
        }, 10)
    }

    const closeProject = () => {
        if (overlayRef.current && modalRef.current) {
            gsap.to(modalRef.current, { opacity: 0, y: 40, duration: 0.35, ease: 'power2.in' })
            gsap.to(overlayRef.current, {
                opacity: 0, duration: 0.35, delay: 0.15,
                onComplete: () => setActiveProject(null)
            })
        } else {
            setActiveProject(null)
        }
    }

    return (
        <section id="portfolio" ref={sectionRef} className="portfolio">
            <div className="portfolio-inner">
                <div ref={headingRef} className="portfolio-heading">
                    <span className="section-label">Selected Work</span>
                    <h2>Portfolio</h2>
                </div>

                <div className="portfolio-grid">
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            ref={el => itemsRef.current[i] = el}
                            className="portfolio-item"
                            onClick={() => openProject(project)}
                            style={{ '--accent': project.color }}
                        >
                            <div className="portfolio-thumb" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.accent})` }}>
                                <div className="portfolio-art">
                                    <div className="art-line" />
                                    <div className="art-box" />
                                    <div className="art-circle" />
                                </div>
                                <div className="portfolio-category-badge">{project.category}</div>
                            </div>
                            <div className="portfolio-info">
                                <h3>{project.title}</h3>
                                <div className="portfolio-tags">
                                    {project.software.map(s => <span key={s} className="tag">{s}</span>)}
                                </div>
                                <div className="portfolio-cta">View Project →</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {activeProject && (
                <div ref={overlayRef} className="modal-overlay" onClick={closeProject}>
                    <div ref={modalRef} className="modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeProject}>✕</button>
                        <div
                            className="modal-hero"
                            style={{ background: `linear-gradient(135deg, ${activeProject.color}, ${activeProject.accent})` }}
                        >
                            <div className="modal-art">
                                <div className="art-line" />
                                <div className="art-box" />
                                <div className="art-circle" />
                                <div className="art-line2" />
                            </div>
                            <div className="modal-hero-title">
                                <span className="modal-category">{activeProject.category}</span>
                                <h2>{activeProject.title}</h2>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="modal-tags">
                                {activeProject.software.map(s => (
                                    <span key={s} className="modal-tag">{s}</span>
                                ))}
                            </div>
                            <p className="modal-desc">{activeProject.desc}</p>
                            <div className="modal-comparison">
                                <div className="comparison-label">
                                    <span>Before</span>
                                    <span>After</span>
                                </div>
                                <div className="comparison-bar">
                                    <div
                                        className="comparison-fill"
                                        style={{ background: `linear-gradient(90deg, rgba(60,54,51,0.2), ${activeProject.color})` }}
                                    />
                                </div>
                                <p className="comparison-note">Lighting comparison — raw render vs final composite</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
