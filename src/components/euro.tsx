import React from 'react';

// Map quốc gia với đường dẫn ảnh cờ tương ứng
const flagMap: { [key: string]: string } = {
  Albania: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/albania.png',
  Austria: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/austria.png',
  Belgium: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/belgium.png',
  Croatia: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/croatia2.png',
  'Czech Republic': 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/czech-republic.png',
  Denmark: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/denmark.png',
  England: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/england.png',
  France: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/france.png',
  Georgia: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/georgia.png',
  Germany: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/germany.png',
  Holland: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/holland.png',
  Hungary: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/hungary.png',
  Italy: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/italy.png',
  Poland: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/poland.png',
  Portugal: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/portugal.png',
  Romania: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/romania.png',
  Scotland: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/scotland.png',
  Serbia: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/serbia.png',
  Slovakia: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/slovakia.png',
  Slovenia: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/slovenia.png',
  Spain: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/spain.png',
  Switzerland: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/switzerland.png',
  Turkey: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/turkey.png',
  Ukraine: 'https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/45_45/ukraine.png',
};

const Euro2024Component: React.FC = () => {
  const teams = [
    ['Albania', 'Austria', 'Belgium', 'Croatia'],
    ['Czech Republic', 'Denmark', 'England', 'France'],
    ['Georgia', 'Germany', 'Holland', 'Hungary'],
    ['Italy', 'Poland', 'Portugal', 'Romania'],
    ['Scotland', 'Serbia', 'Slovakia', 'Slovenia'],
    ['Spain', 'Switzerland', 'Turkey', 'Ukraine'],
  ];

  return (
    <div className="mx-auto ">
      {/* Header Section */}
      <div className="relative">
        <img
          src="https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/1200_265//media/catalog/category/UK-Euro2024-topbanner.jpg"
          alt="UEFA Euro 2024"
          className="w-full h-72 object-cover"
        />
      </div>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mt-4">
        Home / Euro 2024
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold mt-4 text-center">
        Official Euro 2024 Shirts - The European Elite
      </h1>

      {/* Qualified Teams Section */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Qualified Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 ml-10">
          {teams.map((group, index) => (
            <div key={index} className="space-y-4">
              {group.map((team) => (
                <div key={team} className="flex items-center justify-start space-x-4">
                  <img
                    src={flagMap[team]} // Using flagMap for team flags
                    alt={team}
                    className="h-8 w-8 object-cover"
                  />
                  <span className="text-lg font-medium">{team}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Euro2024Component;
