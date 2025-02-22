
import ExpenseTracker from "@/components/ExpenseTracker";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: 'url("/lovable-uploads/44d0ff1a-b37c-4395-84b7-c585c6025173.png")',
      }}
    >
      <div className="absolute inset-0 bg-white/90"></div>
      <div className="relative">
        <ExpenseTracker />
      </div>
    </div>
  );
};

export default Index;
