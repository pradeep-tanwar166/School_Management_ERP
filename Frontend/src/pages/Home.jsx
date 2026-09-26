import Navbar from '../components/Navbar';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

function Home() {
  return (
    <div className='mx-20 mt-10'>
      <Navbar/>
      <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={[{month:"January",profit:2000},{month:"February",profit:3000},{month:"March",profit:1000},{month:"April",profit:7000},{month:"May",profit:6000},{month:"June",profit:4000},{month:"July",profit:2000},{month:"August",profit:4000},{month:"Septmenber",profit:8000},{month:"October",profit:3000},{month:"November",profit:3000},{month:"December",profit:10000}]}>
      <CartesianGrid />
      <Line dataKey="profit" />
      <XAxis dataKey="month" />
      <YAxis />
      
      <Legend />
    
    </LineChart>
</div>
  )
}

export default Home
