export default function Etoiles({number}){
    
    return(
        <div className="flex" >
    {Array.from({ length: 5 }).map((_, i) => {
        const fullStars = Math.floor(number); // Nombre d'étoiles pleines
        const hasHalfStar = number % 1 !== 0; // Demi-étoile si le rating a une décimale
        const isHalfStar = i === fullStars && hasHalfStar; // Vérifie si c'est une demi-étoile
        const starType = i < fullStars 
            ? 'full' 
            : isHalfStar 
            ? 'half' 
            : 'empty'; // Type d'étoile (pleine, demi, vide)
        
        return (
        <div key={i} className="relative w-6 h-6">
            {starType === 'half' ? (
            <>
                {/* Demi-étoile colorée (partie gauche) */}
                <svg
                className="absolute top-0 left-0 w-6 h-6 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }}
                >
                <path d="M12 .587l3.668 7.455L24 9.588l-6 5.857L19.336 24 12 19.765 4.664 24 6 15.445 0 9.588l8.332-1.546z" />
                </svg>
                {/* Demi-étoile non colorée (partie droite) */}
                <svg
                className="absolute top-0 left-0 w-6 h-6 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                >
                <path d="M12 .587l3.668 7.455L24 9.588l-6 5.857L19.336 24 12 19.765 4.664 24 6 15.445 0 9.588l8.332-1.546z" />
                </svg>
            </>
            ) : (
            <svg
                className={`w-6 h-6 ${starType === 'full' ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                d="M12 .587l3.668 7.455L24 9.588l-6 5.857L19.336 24 12 19.765 4.664 24 6 15.445 0 9.588l8.332-1.546z"
                />
            </svg>
            )}
        </div>
        );
    })}
    </div>
)
}