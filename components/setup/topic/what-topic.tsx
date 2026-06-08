import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const WhatTopic = () => {
  return (
    <Card className="w-full my-5">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Qual é o tema?</CardTitle>
        <CardDescription>
          Escolha o universo para a partida de hoje.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
