const categories = [
    "Education",
    "Gaming",
    "Music",
    "Sports",
    "Technology",
    "Entertainment",
    "General"
];

const Categories = () => {
    return (
        <div className="flex gap-3 items-center overflow-x-auto">

            {categories.map(item => (
                <button className="bg-black text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-700" key={item}>{item}</button>
            ))}

        </div>
    )
}

export default Categories