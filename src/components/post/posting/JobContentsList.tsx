import React from 'react'

const JobContentsList = ( {items}:any ) => {
  return (
    <>
        {/* table형태로 items 출력. column은 id 와 title, description */}
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item:any) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </>
  )
}

export default JobContentsList