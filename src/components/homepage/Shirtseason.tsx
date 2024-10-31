import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClubApi } from '../../util/api'; // Đảm bảo bạn đã import đúng API mới

const Shirtseason: React.FC = () => {
    const [clubs, setClubs] = useState<Array<{ id: number; name: string; clubLogo: string }>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const data = {
                    pageNum: 1,
                    pageSize: 10,
                    keyWord: '',  // Để trống để lấy tất cả các câu lạc bộ
                    status: true, // Trạng thái là active
                };
                const response = await getClubApi(data);

                // Lọc để lấy đúng 3 câu lạc bộ mong muốn
                const selectedClubs = ["FC Barcelona", "Manchester City", "Real Madrid"];
                const uniqueClubs = response.pageData.filter((club: { name: string }) =>
                    selectedClubs.includes(club.name)
                );

                setClubs(uniqueClubs); // Cập nhật state với 3 câu lạc bộ đã chọn
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
                        key={club.id}
                        className="text-center"
                        onClick={() => handleClubClick(club.name)}
                    >
                        <div className="relative w-full h-[300px] overflow-hidden"> {/* Đặt chiều cao cố định */}
                            <img
                                src={club.clubLogo}
                                alt={club.name}
                                className="w-full h-full object-contain transition duration-300 hover:scale-110" // Sử dụng object-contain để giữ tỉ lệ
                            />
                            <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2">
                                {club.name} {/* Sử dụng trường `name` thay vì `clubName` */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shirtseason;
