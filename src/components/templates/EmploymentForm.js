import DataInput from "../module/employment_module/dataInput";


function EmploymentForm({ data , employementId }) {

  const { branch, jobCategory, jobPlace, jobTitle, jobTime } = data;
  return (
    <div className="employment" dir="rtl">
      <div className="employementForm_container" style={{ padding: 40 }}>
        <div className="titleEmployment">
          <h1>درخواست برای: {jobTitle}</h1>
          <br />
          <h2>واقع شده در: {jobPlace}</h2>
          <br />
          <h2>بازه زمانی: {jobTime}</h2>
        </div>
      </div>
      <DataInput employementId={employementId} />
    </div>
  );
}

export default EmploymentForm;
