import React from 'react';

const Shirtclub: React.FC = () => {
    const clubs = [
        {
            name: "Arsenal",
            imageUrl: "https://i.pinimg.com/564x/18/64/c0/1864c0de39d6fdfdefbe639dc716718b.jpg"
        },
        {
            name: "Bayern Munich",
            imageUrl: "https://i.pinimg.com/564x/18/64/c0/1864c0de39d6fdfdefbe639dc716718b.jpg"
        },
        {
            name: "Liverpool",
            imageUrl: "https://i.pinimg.com/564x/18/64/c0/1864c0de39d6fdfdefbe639dc716718b.jpg"
        },
        {
            name: "Barcelona",
            imageUrl: "https://i.pinimg.com/564x/18/64/c0/1864c0de39d6fdfdefbe639dc716718b.jpg" 
        {
            name: "Real Madrid",
            imageUrl: "https://i.pinimg.com/564x/18/64/c0/1864c0de39d6fdfdefbe639dc716718b.jpg"
        }
    ];

    return (
        <div className="px-20  py-10">
            <div className="grid grid-cols-5 gap-8">
                {clubs.map((club, index) => (
                    <div key={index} className="text-center">
                        <div className="relative">
                            <img
                                src={club.imageUrl}
                                alt={club.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2">
                                {club.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shirtclub;
