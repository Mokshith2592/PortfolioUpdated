export default function Now() { 
  return ( 
    <div className="max-w-4xl mx-auto p-20"> 
      <h1 className="text-4xl font-bold mb-10">Engineering Status</h1> 
      <div className="grid grid-cols-2 gap-6"> 
        {['Redis Server', 'Distributed Systems', 'Go Internals'].map(item => ( 
          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl"> 
            <h3 className="text-blue-500">{item}</h3> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
} 
