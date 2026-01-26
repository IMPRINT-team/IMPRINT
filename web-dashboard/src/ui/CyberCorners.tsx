const CyberCorners = () => {
  const base = 'absolute h-[6px] w-[6px] border border-cyan-500'
  return (
    <>
      <span className={`${base} left-0 top-0 border-b-0 border-r-0`} />
      <span className={`${base} right-0 top-0 border-b-0 border-l-0`} />
      <span className={`${base} bottom-0 left-0 border-r-0 border-t-0`} />
      <span className={`${base} bottom-0 right-0 border-l-0 border-t-0`} />
    </>
  )
}

export default CyberCorners
