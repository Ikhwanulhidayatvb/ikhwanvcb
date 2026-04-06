import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const Gallery = ({ data, lang }) => {
    const [expanded, setExpanded] = useState(false)
    const [activeTab, setActiveTab] = useState("all")
    const [selected, setSelected] = useState(null)

    const getData = () => {
        const internship = data?.internship || []
        const work = data?.work || []
        const random = data?.random || []

        if (activeTab === "internship") return internship
        if (activeTab === "work") return work
        if (activeTab === "random") return random

        return [...internship, ...work, ...random]
    }
    const handleTabChange = (tab) => {
        setActiveTab(tab)
        setExpanded(false)
    }
    const displayData = expanded
        ? getData()
        : getData().slice(0, 3)

    const safeLang = lang || "id"
    const t = {
        id: {
            all: "Semua",
            internship: "Magang",
            work: "Kerja",
            random: "Random",
            more: "Selengkapnya",
            hide: "Sembunyikan",
        },
        en: {
            all: "All",
            internship: "Internship",
            work: "Work",
            random: "Random",
            more: "See More",
            hide: "Hide",
        },
    }

    return (
        <div className="space-y-6">

            {["all", "internship", "work", "random"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`
      px-4 py-2 rounded-xl border transition
      bg-white text-black border-black/20
      dark:bg-black/20 dark:text-white dark:border-white/20
      ${activeTab === tab ? "bg-black text-white dark:bg-white dark:text-black" : ""}
    `}
                >
                    {t[safeLang]?.[tab] || tab}
                </button>
            ))}

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px]">

                {displayData.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        onClick={() => setSelected(item)}
                        className="
              cursor-pointer overflow-hidden rounded-xl
              bg-black/5 dark:bg-white/5
              border border-black/10 dark:border-white/10
            "
                    >
                        {item.type === "image" ? (
                            <img
                                src={item.src}
                                className="w-full h-full object-cover hover:scale-105 transition"
                            />
                        ) : (
                            <video
                                src={item.src}
                                className="w-full h-full object-cover"
                                muted
                                loop
                            />
                        )}
                    </motion.div>
                ))}

            </div>

            {/* BUTTON */}
            <div className="flex justify-center">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="
            px-6 py-2 rounded-xl font-medium transition
            bg-black text-white
            dark:bg-white dark:text-black
          "
                >
                    {expanded ? t[safeLang].hide : t[safeLang].more}
                </button>
            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
                        onClick={() => setSelected(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >

                        <motion.div
                            className="max-w-5xl w-full"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >

                            {selected.type === "image" ? (
                                <img
                                    src={selected.src}
                                    className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
                                />
                            ) : (
                                <video
                                    src={selected.src}
                                    controls
                                    autoPlay
                                    className="w-full h-auto max-h-[90vh] rounded-xl"
                                />
                            )}

                        </motion.div>

                        <button
                            className="absolute top-5 right-5 text-white text-2xl"
                            onClick={() => setSelected(null)}
                        >
                            ✕
                        </button>

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}