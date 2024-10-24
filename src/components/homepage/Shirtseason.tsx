import React, { useEffect, useState } from 'react';
import { getShirtByMultipleNamesApi } from '../../util/api';
import { useNavigate } from 'react-router-dom';

const Shirtseason: React.FC = () => {
    const [clubs, setClubs] = useState<Array<{ clubId: number; clubName: string; clubLogo: string }>>([]);
    const navigate = useNavigate(); // Khai báo useNavigate

    // Gọi API khi component mount
    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const data = {
                    pageNum: 1,
                    pageSize: 20,
                    nameShirt: '', // Điều kiện lọc nếu cần
                    nameClub: '',  // Điều kiện lọc nếu cần
                    nameSeason: '', // Điều kiện lọc nếu cần
                    namePlayer: '', // Điều kiện lọc nếu cần
                    status: 1
                };
                const response = await getShirtByMultipleNamesApi(data); // Gọi API

                // Lọc ra các câu lạc bộ cụ thể và đảm bảo không bị trùng
                const selectedClubs = ['Real Madrid', 'Barcelona', 'Manchester United'];
                const uniqueClubs = response.pageData.filter((club: { clubName: string }) =>
                    selectedClubs.includes(club.clubName)
                );

                // Loại bỏ các câu lạc bộ trùng lặp
                const clubsMap = new Map(); // Dùng Map để loại bỏ trùng lặp
                uniqueClubs.forEach((club: { clubName: any; }) => {
                    if (!clubsMap.has(club.clubName)) {
                        clubsMap.set(club.clubName, club);
                    }
                });

                // Chuyển đổi Map thành mảng
                setClubs(Array.from(clubsMap.values())); // Cập nhật danh sách clubs sau khi lọc
            } catch (error) {
                console.error('Error fetching clubs:', error);
            }
        };

        fetchClubs();
    }, []);

    const handleClubClick = (clubId: number) => {
        navigate(`/listshirt/${clubId}`); // Điều hướng đến trang listshirt với clubId
    };

    return (
        <div className="px-20 py-10">
            <div className="grid grid-cols-3 gap-4"> {/* Grid adjusted for 3 columns */}
                {clubs.map((club) => (
                    <div key={club.clubId} className="text-center" onClick={() => handleClubClick(club.clubId)}> {/* Thêm sự kiện onClick */}
                        <div className="relative w-full h-100 overflow-hidden"> {/* Same height as Shirtclub */}
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
