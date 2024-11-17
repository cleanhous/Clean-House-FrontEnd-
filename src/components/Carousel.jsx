import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom"; // Importar o useNavigate

const data = [
    {
        name: `Eletricista`,
        img: `../../public/eletricista.jpg`,
        review: `Encontre os melhores serviços de Eletricista`,
        route: `/eletricistas` // Adicionar a rota correspondente
    },
    {
        name: `Encanador`,
        img: `../../public/encanador.jpg`,
        review: `Encontre os melhores serviços de Encanador`,
        route: `/encanador` // Adicionar a rota correspondente
    },
    {
        name: `Diarista`,
        img: `../../public/diarista.jpg`,
        review: `Encontre os melhores serviços de Diarista`,
        route: `/diaristas` // Adicionar a rota correspondente
    }
]

const Carousel = () => {
    const navigate = useNavigate(); // Usar o hook useNavigate para navegar

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 2, 
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, 
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handleContratarClick = (route) => {
        navigate(route);
    }

    return (
        <div className="w-3/4 m-auto bg-sky-700 rounded-xl p-6">
    <div className="mt-6">  {/* Diminuir de mt-20 para mt-6 */}
        <Slider {...settings}>
            {data.map((d, index) => (
                <div key={index} className="bg-white h-[450px] text-sky-700 rounded-xl">
                    <div className="h-56 rounded-t-xl bg-white flex justify-center items-center">
                        <img src={d.img} className="h-44 w-44 rounded-full" alt={d.name} />
                    </div>

                    <div className="flex flex-col justify-center items-center gap-4 p-4">
                        <p className="text-xl font-semibold">{d.name}</p>
                        <p>{d.review}</p>
                        <button 
                            className="bg-sky-700 text-white text-lg px-6 py-1 rounded-xl"
                            onClick={() => handleContratarClick(d.route)}
                        >
                            Contratar
                        </button>
                    </div>
                </div>
            ))}
        </Slider>
    </div>
</div>

    )
}

export default Carousel;
