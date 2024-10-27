import React, { useEffect, useState } from 'react';
import { getShirtByMultipleNamesApi } from '../../util/api';
import { useNavigate } from 'react-router-dom';

const Shirtseason: React.FC = () => {
    const [clubs, setClubs] = useState<Array<{ clubId: number; clubName: string; clubLogo: string }>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const data = {
                    pageNum: 1,
                    pageSize: 20,
                    nameShirt: '',
                    nameClub: '',
                    nameSeason: '',
                    namePlayer: '',
                    nameTypeShirt : '',
                    status: 1
                };
                const response = await getShirtByMultipleNamesApi(data);

                const selectedClubs = ['Real Madrid', 'Barcelona', 'Manchester United'];
                const uniqueClubs = response.pageData.filter((club: { clubName: string }) =>
                    selectedClubs.includes(club.clubName)
                );

                const clubsMap = new Map<string, { clubId: number; clubName: string; clubLogo: string }>();
                uniqueClubs.forEach((club: { clubId: number; clubName: string; clubLogo: string }) => {
                    if (!clubsMap.has(club.clubName)) {
                        clubsMap.set(club.clubName, club);
                    }
                });

                setClubs(Array.from(clubsMap.values()));
            } catch (error) {
                console.error('Error fetching clubs:', error);
            }
        };

        fetchClubs();
    }, []);

    const handleClubClick = (clubName: string) => {
        navigate(`/listshirt?nameclub=${encodeURIComponent(clubName)}`);
    };

    return (
        <div className="px-20 py-10">
            <div className="grid grid-cols-3 gap-4">
                {clubs.map((club) => (
                    <div
                        key={club.clubId}
                        className="text-center"
                        onClick={() => handleClubClick(club.clubName)}
                    >
                        <div className="relative w-full h-100 overflow-hidden">
                            <img
                                src={club.clubLogo}
                                alt={club.clubName}
                                className="w-full h-full object-cover transition duration-300 hover:scale-110"
                            />
                            <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2">
                                {club.clubName}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shirtseason;
