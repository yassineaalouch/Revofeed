const InfoCard = ({ Icon, title, description }) => {
  return (
    <div className="border w-full max-w-[60%] md:w-[70%] md:h-full xl:max-w-[100%] xl:w-full py-2 bg-white border-yellow-300 shadow-lg rounded-xl animate-move-to-Up  text-center">
      <div className="w-full flex justify-center items-center mb-1 mt-1 " >
        <Icon className="size-8 text-yellow-800" />
      </div>
      <div className="space-y-3 mt-5">
        <h2 className="font-bold text-yellow-800">{title}</h2>
        <p className="text-sm px-3 pb-2">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
