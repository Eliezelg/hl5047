'use client';

import { Rabbi } from '@/types';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RabbiCardProps {
  rabbi: Rabbi;
  onEdit?: (rabbi: Rabbi) => void;
  onDelete?: (id: string) => void;
}

const RabbiCard: React.FC<RabbiCardProps> = ({ rabbi, onEdit, onDelete }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={rabbi.imageUrl || '/rabbis/rav.png'}
              alt={`הרב ${rabbi.firstName} ${rabbi.lastName}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle>{`הרב ${rabbi.firstName} ${rabbi.lastName}`}</CardTitle>
            <CardDescription>{rabbi.city}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {rabbi.description && (
          <p className="text-sm text-gray-500 mb-4">{rabbi.description}</p>
        )}
        {rabbi.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {rabbi.topics.map((topic, index) => (
              <Badge key={index} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
        )}
        {rabbi.languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-semibold">שפות:</span>
            {rabbi.languages.map((language, index) => (
              <Badge key={index} variant="outline">
                {language}
              </Badge>
            ))}
          </div>
        )}
        {rabbi.address && (
          <p className="text-sm">
            <span className="font-semibold">מייל:</span> {rabbi.address}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {onEdit && (
          <Button
            variant="outline"
            onClick={() => onEdit(rabbi)}
          >
            Modifier
          </Button>
        )}
        {onDelete && (
          <Button
            variant="destructive"
            onClick={() => onDelete(rabbi.id)}
          >
            Supprimer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RabbiCard;
