interface ToggleProps {
  onToggle: Function;
  status: boolean;
}

const Toggle = ({ onToggle, status }: ToggleProps) => {
  return (
    <span
      onClick={() => {
        onToggle && onToggle();
      }}
      className={`h-5 w-10 rounded-[25px] relative inline-block cursor-pointer ${
        status ? 'bg-[#4361EE]' : 'bg-[#CCCCCC]'
      }`}>
      <span
        className={`absolute h-[16px] w-[16px] top-1/2 transform -translate-y-1/2 rounded-[50%] 
        transition-all bg-white ${
          !status ? 'left-[2px]' : 'left-[21px]'
        }`}></span>
    </span>
  );
};

export default Toggle;
