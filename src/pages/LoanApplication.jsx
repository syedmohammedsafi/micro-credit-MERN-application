import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { jobs, banks, cities, states, educationalLevels } from "../components/arrays"

// Validation Schema
const loanApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().nonnegative("Age must be a non-negative number").min(21, "Age must be at least 20"),
  pancard: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN card must be valid (e.g., AAAAA1234A)"),
  houseNumber: z.string().min(1, "House Number is required"),
  area: z.string().min(1, "Area is required"),
  zipcode: z.number().int().min(100000, "Invalid Zip code").max(999999, "Invalid Zip code"),
  salary: z.number().positive("Salary must be a positive number"),
  presalary: z.number().positive("Previous salary must be a positive number"),
  house: z.boolean(),
  rent: z.number().nonnegative("Rent must be a non-negative number"),
  expense: z.number().positive("Expense must be a positive number"),
  emi: z.number().nonnegative("EMIs must be a non-negative number"),
  loanamt: z.number().positive("Loan amount must be a positive number"),
  savings: z.number().nonnegative("Savings must be a non-negative number"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  householdSize: z.number().positive("Household size must be a positive number").min(1, "At least 1 person is required in the household"),
});

function Application() {
  const [formErrors, setFormErrors] = useState({});
  const [step, setStep] = useState(1);
  const [datas, setDatas] = useState({
    name: "",
    age: "",
    pancard: "",
    address: "",
    houseNumber: '',
    area: '',
    city: '',
    state: '',
    zipcode: '',
    occupation: "",
    salary: "",
    presalary: "",
    house: false,
    expense: "",
    rent: "",
    emi: "",
    prehike: "",
    posthike: "",
    bank: "",
    loanamt: "",
    savings: "",
    maritalStatus: "",
    gender: "",
    dob: "",
    loanPurpose: "",
    householdSize: "",
    accountType: "",
    accountNumber: "",
    ifscCode: "",
    experience: "",
    education: "",
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const fullAddress = `${datas.houseNumber}, ${datas.area}, ${datas.city}, ${datas.state}, ${datas.zipcode}`;
    try {
      const parsedData = loanApplicationSchema.parse({
        ...datas,
        address: fullAddress,
        age: Number(datas.age),
        salary: Number(datas.salary),
        presalary: Number(datas.presalary),
        rent: Number(datas.rent),
        expense: Number(datas.expense),
        emi: Number(datas.emi),
        experience: Number(datas.experience),
        loanamt: Number(datas.loanamt),
        savings: Number(datas.savings),
        householdSize: Number(datas.householdSize),
        zipcode: Number(datas.zipcode)
      });
      await axios.post('http://localhost:5000/apply', parsedData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body : JSON.stringify(parsedData)
    });
    setFormErrors({});
    alert("Your Loan Application Submitted")
    navigate('/micro-finance/dashboard')   
    } catch (err) {
    if (err instanceof z.ZodError) {
        const errors = {};
        err.errors.forEach((e) => {
          errors[e.path[0]] = e.message;
        });
        setFormErrors(errors);
      }
    }
  };

  const nextStep = () => { setStep(step+1) };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-12">
      <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-4xl font-mono font-bold mb-4 text-center">Loan Application Form</h1>
        <p className="font-semibold text-gray-600 text-center mb-6">Step {step} of 4</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {step == 1 && <>
          <div>
            <label className="text-sm font-medium text-gray-700">Name as per Aadhar <span className="text-red-500">*</span></label>
            <input type="text" name="name" value={datas.name} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Age<span className="text-red-500">*</span></label>
            <input type="number" name="age" value={datas.age} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.age && <p className="text-red-500 text-sm">{formErrors.age}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">PAN Number <span className="text-red-500">*</span></label>
            <input type="text" name="pancard" value={datas.pancard} onInput={ (e) => e.target.value = e.target.value.toUpperCase() } onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.pancard && <p className="text-red-500 text-sm">{formErrors.pancard}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Marital Status <span className="text-red-500">*</span></label>
            <div className="mt-2">
              <label className="inline-flex items-center">
              <input type="radio" name="maritalStatus" value="Single" checked={datas.maritalStatus === "Single"} onChange={change} className="rounded border-gray-300 text-indigo-600 focus:border-indigo-500 focus:ring-indigo-500"/>
            <span className="ml-2">Single</span>
            </label>
            <label className="inline-flex items-center ml-6">
            <input type="radio" name="maritalStatus" value="Married" checked={datas.maritalStatus === "Married"} onChange={change} className="rounded border-gray-300 text-indigo-600 focus:border-indigo-500 focus:ring-indigo-500"/>
            <span className="ml-2">Married</span>
            </label>
          </div>
          {formErrors.maritalStatus && <p className="text-red-500 text-sm">{formErrors.maritalStatus}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
            <select name="gender" value={datas.gender} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Date of Birth<span className="text-red-500">*</span></label>
            <input type="date" name="dob" value={datas.dob} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.dob && <p className="text-red-500 text-sm">{formErrors.dob}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Educational Qualification<span className="text-red-500">*</span></label>
            <select name="education" value={datas.education} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select Educational Level</option>
              {educationalLevels.map((edu, index) => (
                <option key={index} value={edu}>{edu}</option>
              ))}
            </select>
          </div>
          </>}

          {step === 2 && <><div>
            <label className="text-sm font-medium text-gray-700">Housing Status <span className="text-red-500">*</span></label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="checkbox" name="house" checked={datas.house} onChange={(e) => setDatas({ ...datas, house: e.target.checked })} className="rounded border-gray-300 text-indigo-600 focus:border-indigo-500 focus:ring-indigo-500" />
                <span className="ml-2">I own a house</span>
              </label>
            </div>
          </div>
          {!datas.house && (
            <div>
              <label className="text-sm font-medium text-gray-700">Monthly Rent <span className="text-red-500">*</span></label>
              <input type="number" name="rent" value={datas.rent} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              {formErrors.rent && <p className="text-red-500 text-sm">{formErrors.rent}</p>}
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700">Family Size<span className="text-red-500">*</span></label>
            <input type="number" name="householdSize" value={datas.householdSize} onChange={change} min="1" className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.householdSize && <p className="text-red-500 text-sm">{formErrors.householdSize}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">House Number <span className="text-red-500">*</span></label>
            <input type="text" name="houseNumber" value={datas.houseNumber} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
            {formErrors.houseNumber && <p className="text-red-500 text-sm">{formErrors.houseNumber}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Area <span className="text-red-500">*</span></label>
            <input type="text" name="area" value={datas.area} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
            {formErrors.area && <p className="text-red-500 text-sm">{formErrors.area}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
            <select name="city" value={datas.city} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select your city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
            <select name="state" value={datas.state} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select Job Role</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
            {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Zip code <span className="text-red-500">*</span></label>
            <input type="number" name="zipcode" value={datas.zipcode} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.zipcode && <p className="text-red-500 text-sm">{formErrors.zipcode}</p>}
          </div>
          </>}

          {step===3 &&<><div>
            <label className="text-sm font-medium text-gray-700">Employee Role <span className="text-red-500">*</span></label>
            <select name="occupation" value={datas.occupation} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select Job Role</option>
              {jobs.map((job, index) => (
                <option key={index} value={job}>{job}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Years of Experience<span className="text-red-500">*</span></label>
            <input type="number" name="experience" value={datas.experience} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.experience && <p className="text-red-500 text-sm">{formErrors.experience}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Current Monthly Salary <span className="text-red-500">*</span></label>
            <input type="number" name="salary" value={datas.salary} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.salary && <p className="text-red-500 text-sm">{formErrors.salary}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Previous Monthly Salary <span className="text-red-500">*</span></label>
            <input type="number" name="presalary" value={datas.presalary} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.presalary && <p className="text-red-500 text-sm">{formErrors.presalary}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Monthly Grocery Expense <span className="text-red-500">*</span></label>
            <input type="number" name="expense" value={datas.expense} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.expense && <p className="text-red-500 text-sm">{formErrors.expense}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Current EMIs <span className="text-red-500">*</span></label>
            <input type="number" name="emi" value={datas.emi} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.emi && <p className="text-red-500 text-sm">{formErrors.emi}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Last Salary Hike Date <span className="text-red-500">*</span></label>
            <input type="date" name="prehike" value={datas.prehike} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.prehike && <p className="text-red-500 text-sm">{formErrors.prehike}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Expected Next Hike Date <span className="text-red-500">*</span></label>
            <input type="date" name="posthike" value={datas.posthike} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.posthike && <p className="text-red-500 text-sm">{formErrors.posthike}</p>}
          </div>
          </>}

          {step === 4 && <><div>
            <label className="text-sm font-medium text-gray-700">Bank Name <span className="text-red-500">*</span></label>
            <select name="bank" value={datas.bank} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select Bank</option>
              {banks.map((bank, index) => (
                <option key={index} value={bank}>{bank}</option>
              ))}
            </select>
            {formErrors.bank && <p className="text-red-500 text-sm">{formErrors.bank}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Account Type <span className="text-red-500">*</span></label>
            <select name="accountType" value={datas.accountType} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Account Number<span className="text-red-500">*</span></label>
            <input type="number" name="accountNumber" value={datas.accountNumber} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.accountNumber && <p className="text-red-500 text-sm">{formErrors.accountNumber}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">IFSC code<span className="text-red-500">*</span></label>
            <input type="text" name="ifscCode" value={datas.ifscCode} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.ifscCode && <p className="text-red-500 text-sm">{formErrors.ifscCode}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Monthly Savings <span className="text-red-500">*</span></label>
            <input type="number" name="savings" value={datas.savings} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.savings && <p className="text-red-500 text-sm">{formErrors.savings}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Requested Loan Amount <span className="text-red-500">*</span></label>
            <input type="number" name="loanamt" value={datas.loanamt} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            {formErrors.loanamt && <p className="text-red-500 text-sm">{formErrors.loanamt}</p>}
          </div>
          <div>
          <label className="text-sm font-medium text-gray-700">Purpose of Loan <span className="text-red-500">*</span></label>
          <select name="loanPurpose" value={datas.loanPurpose} onChange={change} className="mt-1 block w-full px-3 py-2 rounded-md border-1.5 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" >
            <option value="">Select Loan Purpose</option>
            <option value="Business Expansion">Business Expansion</option>
            <option value="Health Expenses">Health Expenses</option>
            <option value="Education">Education</option>
            <option value="Home Renovation">Home Renovation</option>
            <option value="Emergency Fund">Emergency Fund</option>
            <option value="Other">Other</option>
          </select>
          </div></>}
        </div>
        {step !==4 && <div className="flex justify-center my-4">
          <button onClick={nextStep} className="mt-2 bg-indigo-600 text-white px-12 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Next</button>
        </div>}
        {step === 4 && <div className="flex justify-center my-4">
          <button onClick={submit} className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Submit Application</button>
        </div>}
        </div>
    </div>
  );
}

export default Application;