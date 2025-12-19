import Image from "next/image";

export const MemberCard = ({ member, showBio }: any) => {
  const LARAVEL_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const photoUrl = member.photo_url || (member.photo ? `${LARAVEL_BASE_URL}/storage/${member.photo}` : null);

  return (
    <div className="group relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105">
      <div className="relative h-96 overflow-hidden">
        {photoUrl ? (
          <Image src={photoUrl} alt={member.name} width={600} height={600} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="bg-gradient-to-br from-[#4D24ED] to-[#3a1ab3] w-full h-full" />
        )}
      </div>
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-threls-primary">{member.name}</h3>
        <p className="text-xl font-semibold text-threls-primary mt-2">{member.role}</p>
        {showBio && member.bio && (
          <div className="mt-6 text-gray-600 prose prose-sm" dangerouslySetInnerHTML={{ __html: member.bio }} />
        )}
      </div>
    </div>
  );
};