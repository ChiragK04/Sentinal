'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getThreadsByAssistantId } from '@/lib/api';
import { useHeaderContext } from '@/context/HeaderContext';
import BasicArea from '../_components/AreaCurve';

const Page = () => {
    const { astId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const route = useRouter();
    
    const { setSelectedItem, setSelectedMenu } = useHeaderContext();
    useEffect(() => {
      setSelectedItem("ChatBot"); 
      setSelectedMenu("Monitor");
    }, [setSelectedItem, setSelectedMenu]);

    useEffect(() => {
        const fetchData = async () => {
            if (astId !== 'defaultThread') {
                try {
                    const response = await getThreadsByAssistantId(astId as string);
                    setData(response);
                } catch (error) {
                    console.error('Error fetching threads:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchData();
    }, [astId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (astId === 'defaultThread') {
        route.push('/overview/dashbored/bots');
    }

    return (
        <div>
            <div className="">

            <BasicArea/>
            </div>
            <div className="w-full border-b-2 border-primary"></div>
            <div>
                {/* Assuming `data` contains a message or info to display */}
                <p>{JSON.stringify(data)}</p> {/* Or render the data in a more meaningful way */}
            </div>
        </div>
    );
};

export default Page;