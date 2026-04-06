import { motion } from "framer-motion"
import { FaSpotify } from "react-icons/fa"

export const MusicPlayer = ({ lang }) => {
    const spotifyUrl =
        "https://open.spotify.com/playlist/1z98U117scuVDrFaAXdhgV"

    const safeLang = lang || "id"

    const t = {
        id: {
            title: "Buka Spotify Saya",
            desc: "Dengarkan playlist & selera musik saya",
            hint: "Klik untuk membuka Spotify",
            button: "Buka",
        },
        en: {
            title: "Open My Spotify",
            desc: "Listen to my playlist & music taste",
            hint: "Click to open Spotify",
            button: "Open",
        },
    }

    const L = t[safeLang]

    return (
        <motion.div
            className="w-full max-w-xl mx-auto p-6 rounded-3xl cursor-pointer bg-white text-black
            dark:bg-gradient-to-br dark:from-black/80 dark:via-black/70 dark:to-black/90 dark:text-white
            backdrop-blur-xl border border-black/10 dark:border-white/10
            shadow-lg dark:shadow-2x
            transition-all
            "
            whileHover={{ scale: 1.03 }}
            onClick={() => window.open(spotifyUrl, "_blank")}
        >
            {/* HEADER */}
            <div className="flex items-center gap-3">
                <FaSpotify size={32} className="text-green-500" />

                <div>
                    <h3 className="text-lg font-semibold">
                        {L.title}
                    </h3>

                    <p className="text-sm text-gray-700 dark:text-gray-200">
                        {L.desc}
                    </p>
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-5 flex justify-between items-center">
                <span className="text-xs text-black/50 dark:text-gray-400">
                    {L.hint}
                </span>

                <button
                    className="
                        px-4 py-2 rounded-xl
                        bg-green-500 text-black font-semibold
                        hover:scale-105 hover:bg-green-600 transition
                    "
                >
                    {L.button}
                </button>
            </div>
        </motion.div>
    )
}