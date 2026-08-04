//front/src/routes/Metricas.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { X } from "lucide-react";

const API = "https://agente.bizapp.pe/api/auth";

export default function Metricas() {

  const [open, setOpen] = useState(false);

  const [metricas, setMetricas] = useState({
    ase_total_ges: 0,
    min_tmo_alto: "00:00:00",
    ase_productividad: 0
  });

  const token = localStorage.getItem("token");

  const obtenerMetricas = async () => {

    try {

      const { data } = await axios.get(
        `${API}/metricas`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMetricas({
        ase_total_ges: Number(data.ase_total_ges ?? 0),
        min_tmo_alto: data.min_tmo_alto ?? "00:00:00",
        ase_productividad: Number(data.ase_productividad ?? 0)
      });

    } catch (err) {

      console.error("Error obteniendo métricas", err);

    }

  };

  useEffect(() => {

    if (!token) return;

    obtenerMetricas();

    const intervalo = setInterval(() => {

      obtenerMetricas();

    }, 180000);

    return () => clearInterval(intervalo);

  }, []);

  const porcentaje = useMemo(() => {

    const p = Number(metricas.ase_productividad) || 0;

    return Math.max(0, Math.min(100, p));

  }, [metricas]);

  const color = useMemo(() => {

    if (porcentaje >= 80)
      return "#22c55e";

    if (porcentaje >= 50)
      return "#eab308";

    return "#ef4444";

  }, [porcentaje]);

  const radio = 52;

  const circ = 2 * Math.PI * radio;

  const dash = circ - (porcentaje / 100) * circ;

  return (

    <>

      {/* BOTON LATERAL */}

      <motion.div

  initial={{
    boxShadow: "0 0 0 rgba(59,130,246,0)"
  }}

  animate={{

    background: [

      "linear-gradient(180deg,#2563eb,#1d4ed8)",

      "linear-gradient(180deg,#7c3aed,#2563eb)",

      "linear-gradient(180deg,#06b6d4,#2563eb)",

      "linear-gradient(180deg,#2563eb,#1d4ed8)"

    ],

    boxShadow: [

      "0 0 10px rgba(37,99,235,.35)",

      "0 0 24px rgba(124,58,237,.55)",

      "0 0 18px rgba(6,182,212,.45)",

      "0 0 10px rgba(37,99,235,.35)"

    ]

  }}

  transition={{

    duration: 5,

    repeat: Infinity,

    ease: "linear"

  }}

  whileHover={{

    x: 6,

    scale: 1.05

  }}

  whileTap={{

    scale: .96

  }}

  onClick={() => setOpen(true)}

  className="
    fixed
    left-0
    top-1/2
    -translate-y-1/2
    z-[9999]
    cursor-pointer
    text-white
    rounded-r-xl
    shadow-2xl
    px-3
    py-6
    select-none
  "

>

  <motion.div

    animate={{
      opacity: [1, .75, 1]
    }}

    transition={{
      duration: 2,
      repeat: Infinity
    }}

    className="
      rotate-180
      tracking-[0.35em]
      font-extrabold
      text-sm
    "

    style={{
      writingMode: "vertical-rl"
    }}

  >

    MIS MÉTRICAS

  </motion.div>

</motion.div>
<AnimatePresence>

  {
    open && (

      <motion.div

        initial={{
          x: -270,
          opacity: 0
        }}

        animate={{
          x: 0,
          opacity: 1
        }}

        exit={{
          x: -270,
          opacity: 0
        }}

        transition={{
          duration: .30
        }}

        className="
          fixed
          left-0
          top-1/2
          -translate-y-1/2
          w-[190px]
          bg-white
          rounded-r-2xl
          shadow-2xl
          z-[9999]
          border
          border-slate-200
          p-3
        "

      >

        <button

          onClick={() => setOpen(false)}

          className="
            absolute
            -top-3
            -right-3
            w-8
            h-8
            rounded-full
            bg-red-500
            hover:bg-red-600
            hover:scale-110
            transition-all
            text-white
            shadow-lg
            flex
            items-center
            justify-center
            cursor-pointer
          "

        >

          <X size={17} strokeWidth={2.8}/>

        </button>


        <div className="space-y-3">


          {/* TOTAL */}

          <motion.div

            whileHover={{
              scale:1.03
            }}

            className="
              relative
              overflow-hidden
              rounded-xl
              border
              border-purple-200
              p-3
              text-center
              shadow-[0_8px_20px_rgba(124,58,237,0.15)]
            "

          >

            <div

              className="
                absolute
                bottom-0
                left-0
                h-1
                w-full
                bg-gradient-to-r
                from-purple-500
                via-violet-500
                to-purple-700
              "

            />


            <div

              className="
                text-[12px]
                uppercase
                tracking-[0.18em]
                font-bold
                text-gray-900
                mb-2
              "

            >

              Total gestiones

            </div>


            <motion.div

              key={metricas.ase_total_ges}

              initial={{
                scale:.8,
                opacity:0
              }}

              animate={{
                scale:1,
                opacity:1
              }}

              className="
                text-3xl
                font-black
                text-purple-600
                leading-none
              "

            >

              {metricas.ase_total_ges}

            </motion.div>


          </motion.div>



          {/* TMO */}

          <motion.div

            whileHover={{
              scale:1.03
            }}

            className="
              relative
              overflow-hidden
              rounded-xl
              border
              border-blue-200
              p-3
              text-center
              shadow-[0_8px_20px_rgba(37,99,235,0.15)]
            "

          >

            <div

              className="
                absolute
                bottom-0
                left-0
                h-1
                w-full
                bg-gradient-to-r
                from-blue-400
                via-blue-600
                to-cyan-400
              "

            />


            <div

              className="
                text-[12px]
                uppercase
                tracking-[0.18em]
                font-bold
                text-gray-900
                mb-2
              "

            >

              TMO

            </div>


            <motion.div

              key={metricas.min_tmo_alto}

              initial={{
                opacity:0,
                y:5
              }}

              animate={{
                opacity:1,
                y:0
              }}

              className="
                text-3xl
                font-black
                text-blue-600
                tabular-nums
              "

            >

              {metricas.min_tmo_alto}

            </motion.div>


          </motion.div>




          {/* PRODUCTIVIDAD */}

          <motion.div

            whileHover={{
              scale:1.03
            }}

            className="
              relative
              overflow-hidden
              rounded-xl
              border
              border-red-200
              p-3
              text-center
              shadow-[0_8px_20px_rgba(239,68,68,0.15)]
            "

          >

            <div

              className="
                absolute
                bottom-0
                left-0
                h-1
                w-full
                bg-gradient-to-r
                from-red-200
                via-yellow-300
                to-green-200
              "

            />


            <div

              className="
                text-[12px]
                uppercase
                tracking-[0.18em]
                font-bold
                text-gray-900
                mb-2
              "

            >

              Productividad

            </div>


            <motion.div

              key={porcentaje}

              initial={{
                scale:.75,
                opacity:0
              }}

              animate={{
                scale:1,
                opacity:1
              }}

              transition={{
                duration:.35
              }}

              className={`

                text-3xl
                font-black

                ${
                  porcentaje < 50
                    ? "text-red-500"
                    : porcentaje < 80
                    ? "text-yellow-500"
                    : "text-green-600"
                }

              `}

            >

              {porcentaje.toFixed(2)}%

            </motion.div>


          </motion.div>


        </div>


      </motion.div>

    )
  }

</AnimatePresence>
    </>

  );

}