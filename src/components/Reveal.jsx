import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const Reveal = ({ children }) => {
    const ref = useRef(null)

    useEffect(() => {
        gsap.fromTo(
            ref.current,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 80%",
                },
            }
        )
    }, [])

    return <div ref={ref}>{children}</div>
}