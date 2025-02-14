import React from 'react'

export const TrainingGraph = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4'>
          <h2 className='text-2xl md:text-2xl mb-6 font-serif'>The model is good, if you dont believe me, then believe this graph</h2>
        <img src="/images/training-graph.png" alt="Training Graph" className="max-w-full h-auto rounded-lg" />
    </div>
  )
}
