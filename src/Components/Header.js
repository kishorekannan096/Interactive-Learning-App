import '../App.css';

function Header() {
  return (
    <div className="flex flex-row w-full">{/* Header */}
      <section className="flex w-full flex-col py-12 space-y-12 bg-amber-400 items-center text-center">
          <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
      </section>  
    </div>
  );
}

export default Header;