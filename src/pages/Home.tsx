import { FC, useRef, useState, useEffect } from "react";
import layoutbg from '../assets/layout-bg.png';

const Home: FC = () => {
    const logoUrlRef = useRef<HTMLInputElement>(null);
    const companyNameRef = useRef<HTMLInputElement>(null);
    const positionRef = useRef<HTMLInputElement>(null);
    const [isNew, setIsNew] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [jobType, setJobType] = useState('');
    const [workType, setWorkType] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [savedData, setSavedData] = useState<any[]>([]);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        const storedData = localStorage.getItem("companyData");
        if (storedData) {
            setSavedData(JSON.parse(storedData));
        }
    }, []);

    const validateForm = () => {
        const newErrors: any = {};
        if (!logoUrlRef.current?.value) newErrors.logoUrl = "Logotip URL kiritilishi kerak!";
        if (!companyNameRef.current?.value) newErrors.companyName = "Kompaniya nomi kiritilishi kerak!";
        if (!positionRef.current?.value) newErrors.position = "Lavozim kiritilishi kerak!";
        if (!jobType) newErrors.jobType = "Vaqtni tanlang!";
        if (!workType) newErrors.workType = "Ish turini tanlang!";
        if (!location) newErrors.location = "Joylashuvni tanlang!";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        const newData = {
            logoUrl: logoUrlRef.current?.value,
            companyName: companyNameRef.current?.value,
            position: positionRef.current?.value,
            isNew,
            isFeatured,
            jobType,
            workType,
            location,
            skills,
        };

        const updatedData = [...savedData, newData];
        setSavedData(updatedData);
        localStorage.setItem("companyData", JSON.stringify(updatedData));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, skill: string) => {
        if (event.target.checked) {
            setSkills((prevSkills) => [...prevSkills, skill]);
        } else {
            setSkills((prevSkills) => prevSkills.filter((item) => item !== skill));
        }
    };

    const handleDelete = (index: number) => {
        const updatedData = savedData.filter((_, i) => i !== index);
        setSavedData(updatedData);
        localStorage.setItem("companyData", JSON.stringify(updatedData));
    };

    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${layoutbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100px',
                    zIndex: 1000,
                }}
            ></div>

            <div className="flex justify-center items-center mt-[20px] mb-[120px]">
                <div className="bg-white p-8 rounded-lg shadow-md w-[600px]">
                    <h1 className="text-2xl font-bold mb-6">Vakansiya ma'lumotlarini kiriting</h1>
                    <form>
                        <div>
                            <h2 className="text-black font-bold">Logotib URL</h2>
                            <input
                                ref={logoUrlRef}
                                type="text"
                                placeholder="Logotip URL manzilini kiriting"
                                className="w-full py-3 px-2 mt-3 border border-gray-500 rounded-md mb-3"
                            />
                            {errors.logoUrl && <p className="text-red-500">{errors.logoUrl}</p>}
                        </div>
                        <div>
                            <h2 className="text-black font-bold">Kompaniya nomi</h2>
                            <input
                                ref={companyNameRef}
                                type="text"
                                placeholder="Manage"
                                className="w-full py-3 px-2 mt-3 border border-gray-500 rounded-md mb-3"
                            />
                            {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
                        </div>
                        <div className="flex items-center gap-2 mt-3 mb-3">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={isNew}
                                    onChange={() => setIsNew(!isNew)}
                                    className="w-4 h-4 mr-2 rounded text-teal-500"
                                />
                                <span>Yangi</span>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    checked={isFeatured}
                                    onChange={() => setIsFeatured(!isFeatured)}
                                    className="w-4 h-4 mr-2 rounded text-teal-500"
                                />
                                <span>Featured</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-black font-bold">Lavozim</h2>
                            <input
                                ref={positionRef}
                                type="text"
                                placeholder="Fullstack Developer"
                                className="w-full py-3 px-2 mt-3 border border-gray-500 rounded-md mb-3"
                            />
                            {errors.position && <p className="text-red-500">{errors.position}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="w-full">
                                <h2 className="text-black font-bold">Vaqt</h2>
                                <select onChange={(e) => setJobType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg">
                                    <option>Tanlang</option>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Freelance</option>
                                </select>
                                {errors.jobType && <p className="text-red-500">{errors.jobType}</p>}
                            </div>
                            <div className="w-full">
                                <h2 className="text-black font-bold">Ish turi</h2>
                                <select onChange={(e) => setWorkType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg">
                                    <option>Tanlang</option>
                                    <option>Remote</option>
                                    <option>In-office</option>
                                </select>
                                {errors.workType && <p className="text-red-500">{errors.workType}</p>}
                            </div>
                            <div className="w-full">
                                <h2 className="text-black font-bold">Joylashuv</h2>
                                <select onChange={(e) => setLocation(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg">
                                    <option>Tanlang</option>
                                    <option>Toshkent</option>
                                    <option>Samarkand</option>
                                    <option>Farg'ona</option>
                                </select>
                                {errors.location && <p className="text-red-500">{errors.location}</p>}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-black font-bold mt-3">Ko'nikmalar</h2>
                            <div className="flex items-center gap-[200px]">
                                <div>
                                    <div className="flex items-center text-black font-medium">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(e, 'Fullstack')}
                                            className="w-4 h-4 mr-2 rounded text-teal-500"
                                        />
                                        <h3>Fullstack</h3>
                                    </div>
                                    <div className="flex items-center text-black font-medium">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(e, 'Phyton')}
                                            className="w-4 h-4 mr-2 rounded text-teal-500"
                                        />
                                        <h3>Phyton</h3>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center text-black font-medium">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(e, 'Midweight')}
                                            className="w-4 h-4 mr-2 rounded text-teal-500"
                                        />
                                        <h3>Midweight</h3>
                                    </div>
                                    <div className="flex items-center text-black font-medium">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(e, 'Junior')}
                                            className="w-4 h-4 mr-2 rounded text-teal-500"
                                        />
                                        <h3>React</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSave} className="w-full py-3 mt-4 bg-gray-700 text-white rounded-lg">Saqlash</button>
                    </form>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-[800px]">
                    {savedData.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4 w-full">
                            <div className="flex items-center gap-5">
                                <div>
                                    <img src={item.logoUrl} alt="Company Logo" className="w-16 rounded-full h-16 object-contain mb-4" />
                                </div>
                                <div>
                                    <div className="flex gap-6">
                                        <h2 className="text-[#5CA5A5] font-bold text-xl mb-3">{item.companyName}</h2>
                                        <p>
                                            {item.isNew && (
                                                <span className="bg-[#5CA5A5] text-white px-2 py-1 rounded-xl mr-2 font-medium">
                                                    Yangi
                                                </span>
                                            )}
                                            {item.isFeatured && (
                                                <span className="bg-gray-950 text-white px-2 py-1 rounded-xl mr-2 font-medium">
                                                    Featured
                                                </span>
                                            )}
                                        </p>

                                    </div>
                                    <div className="flex items-center gap-[50px] justify-between">
                                        <h3 className="text-gray-black font-bold">{item.position}</h3>
                                        <div className="mt-4 bg-[#99dfdf] text-[#5CA5A5] font-bold rounded-md px-2  mr-[700px]">
                                            <ul className="">
                                                {item.skills.map((skill, index) => (
                                                    <li key={index}>{skill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-[50px]">
                                    <p className="text-gray-400 font-bold">{item.workType} - {item.jobType}  -  {item.location}</p>

                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-500 text-white px-2 rounded-md mt-4 "
                                    >
                                        x
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;