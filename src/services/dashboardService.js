import Papa from "papaparse"
import csvPath from "../data/delivery_events_result.csv"

export const getDashboardData = async () => {
  try {
    // Fetch the actual CSV file using its path
    const response = await fetch(csvPath)
    const csvText = await response.text()
    
    const result = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    })
    
    console.log('Dashboard Data:', result.data)
    return result.data
    
  } catch (error) {
    console.error('Error parsing CSV:', error)
    return []
  }
}

export default getDashboardData